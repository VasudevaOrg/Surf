import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { NativeModules } from 'react-native';
import MicroPhoneFill from '../../../assets/icons/MicroPhoneFill';
import CloseIcon from '../../../assets/icons/CloseIcon';
import ColorPalette from '../../../config/ColorPalette';
import { Typography } from '../../MainComponents/Typography/Typography';
import { TypographyVariant } from '../../MainComponents/Typography/Typography.types';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

interface VoiceSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isVisible,
  onClose,
  onResult,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [partialResults, setPartialResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      startListening();
    } else {
      stopListening();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const onSpeechStart = () => {
    setIsListening(true);
    setError(null);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setIsListening(false);
    console.log('onSpeechError: ', e);
    if (e.error?.message?.includes('No match')) {
      // Silent fail for "no match" usually means user stopped talking
    } else {
      setError(e.error?.message || 'Speech Recognition Error');
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      setResults(e.value);
      const transcript = e.value[0];
      setTimeout(() => {
        onResult(transcript);
        onClose();
      }, 800);
    }
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setPartialResults(e.value);
    }
  };

  const startListening = async () => {
    setResults([]);
    setPartialResults([]);
    setError(null);

    try {
      if (Platform.OS === 'android') {
        console.log('Requesting microphone permission...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'Surf App needs access to your microphone to search.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('Permission status:', granted);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Microphone permission denied');
          return;
        }
      }

      console.log('NativeModules.Voice:', !!NativeModules.Voice);
      const isAvailable = await Voice.isAvailable();
      console.log('Voice.isAvailable:', isAvailable);

      if (!NativeModules.Voice) {
        setError('Voice native module not found. Rebuild might be needed.');
        return;
      }

      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
      setError('Could not start voice recognition');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon size={24} color={ColorPalette.TEXT_GREY_500 as string} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Typography
              text={isListening ? 'Listening...' : 'Search for products'}
              variant={TypographyVariant.H5_BOLD}
              customTextStyles={styles.title}
            />

            <View style={styles.micContainer}>
              <Animated.View
                style={[
                  styles.pulseCircle,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: isListening ? 1 : 0,
                  },
                ]}
              />
              <TouchableOpacity
                style={styles.micButton}
                activeOpacity={0.8}
                onPress={isListening ? stopListening : startListening}>
                <MicroPhoneFill
                  size={40}
                  color={
                    isListening
                      ? (ColorPalette.WHITE as string)
                      : (ColorPalette.HOME_BLUE as string)
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={styles.transcriptContainer}>
              <Typography
                text={partialResults[0] || results[0] || 'Say something...'}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={styles.transcript}
                numberOfLines={2}
              />
            </View>

            {error && (
              <Typography
                text={error}
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.errorText}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: getScreenWidth(85),
    backgroundColor: ColorPalette.WHITE,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  title: {
    color: ColorPalette.TEXT_GREY_500,
    marginBottom: 40,
    textAlign: 'center',
  },
  micContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  micButton: {
    width: getScreenWidth(21),
    height: getScreenHeight(10.2),
    borderRadius: 40,
    backgroundColor: ColorPalette.HOME_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  pulseCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(144, 16, 207, 0.2)', // HOME_BLUE with opacity
    zIndex: 1,
  },
  transcriptContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  transcript: {
    color: ColorPalette.TEXT_GREY_400,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  errorText: {
    color: ColorPalette.RED_100,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default VoiceSearchModal;
