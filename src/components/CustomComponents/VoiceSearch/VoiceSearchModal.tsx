import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@dev-amirzubair/react-native-voice';
import { 
  check, 
  request, 
  PERMISSIONS, 
  RESULTS 
} from 'react-native-permissions';
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
    // Safely set up Voice handlers
    const setupVoice = () => {
      try {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
      } catch (e) {
        console.warn('Voice handler setup failed:', e);
      }
    };

    setupVoice();

    return () => {
      try {
        Voice.destroy().then(Voice.removeAllListeners).catch(() => {});
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure modal is full open before starting listening
      const timer = setTimeout(() => {
        startListening();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      stopListening();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    const errorMsg = String(e.error?.message || e.error || '');
    if (errorMsg.includes('No match')) {
      // Silent fail for "no match"
    } else if (errorMsg.includes('permission') || errorMsg.includes('desc') || errorMsg.includes('denied')) {
      setError('Permission denied. Please enable Microphone and Speech Recognition in your settings.');
    } else {
      setError(errorMsg || 'Speech Recognition Error');
    }
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      setResults(e.value);
      const transcript = e.value[0];
      // Give the user a moment to see their last words before closing
      setTimeout(() => {
        onResult(transcript);
        onClose();
      }, 1000);
    }
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (e.value) {
      setPartialResults(e.value);
    }
  };

  const checkIOSPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'ios') return true;

    try {
      const micStatus = await check(PERMISSIONS.IOS.MICROPHONE);
      const speechStatus = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION);

      if (micStatus === RESULTS.GRANTED && speechStatus === RESULTS.GRANTED) {
        return true;
      }

      // Request if not granted
      if (micStatus !== RESULTS.GRANTED) {
        const newMicStatus = await request(PERMISSIONS.IOS.MICROPHONE);
        if (newMicStatus !== RESULTS.GRANTED) return false;
      }

      if (speechStatus !== RESULTS.GRANTED) {
        const newSpeechStatus = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
        if (newSpeechStatus !== RESULTS.GRANTED) return false;
      }

      return true;
    } catch (err) {
      console.warn('Permission check failed:', err);
      return false;
    }
  };

  const startListening = async () => {
    setResults([]);
    setPartialResults([]);
    setError(null);

    try {
      // Check native module exists first
      const { NativeModules: NM } = require('react-native');
      const voiceModule = NM.RNVoice || NM.Voice;
      
      if (!voiceModule) {
        setError('Voice recognition module is not properly linked in this build.');
        return;
      }

      // Handle Permissions rigorously
      if (Platform.OS === 'android') {
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
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Microphone permission denied.');
          return;
        }
      } else if (Platform.OS === 'ios') {
        const hasPermissions = await checkIOSPermissions();
        if (!hasPermissions) {
          setError('Microphone and Speech Recognition permissions are required.');
          return;
        }
      }

      // Check availability
      let isAvailable = false;
      try {
        const isAvailableValue = await Voice.isAvailable();
        isAvailable = !!isAvailableValue;
      } catch (err) {
        isAvailable = true; // Attempt anyway
      }

      if (!isAvailable && Platform.OS === 'android') {
        setError('Speech services are not available on this device.');
        return;
      }

      // Important: Destroy existing session before starting
      try {
        await Voice.stop();
        await Voice.destroy();
      } catch (e) {}

      await Voice.start('en-US');
    } catch (e: any) {
      console.error('Voice start error:', e);
      const msg = String(e?.message || e?.error || e || 'Could not start voice recognition');
      
      if (msg.includes('permission') || msg.includes('denied') || msg.includes('UsageDescription')) {
        setError('Microphone or speech recognition permission is required.');
      } else {
        setError('Please check your settings and try again.');
      }
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
