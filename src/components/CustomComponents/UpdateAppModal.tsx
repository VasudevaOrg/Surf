import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ColorPalette from '../../config/ColorPalette';
import { Typography } from '../MainComponents/Typography/Typography';
import { TypographyVariant } from '../MainComponents/Typography/Typography.types';
import { Spacing, BorderRadius } from '../../config/globalStyles';
import AppLogo from '../../assets/icons/AppLogo';
import AppName from '../../assets/icons/AppName';
import ChevronIcon from '../../assets/icons/ChevronIcon';

interface UpdateAppModalProps {
  isVisible: boolean;
  updateUrl: string;
}

const { width, height } = Dimensions.get('window');

const UpdateAppModal: React.FC<UpdateAppModalProps> = ({ isVisible, updateUrl }) => {
  const handleUpdate = () => {
    if (updateUrl) {
      Linking.openURL(updateUrl).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Main Brand Section */}
          <View style={styles.brandSection}>
            <LinearGradient
              colors={[ColorPalette.HOME_BLUE as string, '#5E0B8A']}
              style={StyleSheet.absoluteFill}
            />

            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />

            <View style={styles.logoWrapper}>
              <AppLogo width={85} height={85} style={undefined} />
              <View style={styles.nameWrapper}>
                <AppName width={130} height={42} color={ColorPalette.WHITE as string} style={undefined} />
              </View>
            </View>
          </View>

          {/* Content Section with increased vertical spacing */}
          <View style={styles.contentSection}>
            <View style={styles.textContainer}>
              <Text style={styles.mainTitle}>
                Upgrade Your Experience
              </Text>

              <Text style={styles.message}>
                We've added new features and performance boosts. Update now to keep surfing smoothly!
              </Text>
            </View>

            <View style={styles.buttonOuterWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleUpdate}
                style={styles.buttonWrapper}
              >
                <LinearGradient
                  colors={[ColorPalette.HOME_BLUE as string, '#5E0B8A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.updateButton}
                >
                  <View style={styles.buttonInner}>
                    <Text style={styles.updateButtonText}>UPDATE NOW</Text>
                    <View style={styles.iconCircle}>
                      <ChevronIcon size={14} color={ColorPalette.HOME_BLUE as string} style={undefined} />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Version 2.0 • Faster & Better
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Slightly darker for better focus
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: ColorPalette.WHITE as string,
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  brandSection: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoWrapper: {
    alignItems: 'center',
    zIndex: 10,
  },
  nameWrapper: {
    marginTop: Spacing.SM,
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1000,
  },
  circle1: { width: 220, height: 220, top: -110, right: -60 },
  circle2: { width: 160, height: 160, bottom: -70, left: -40 },

  contentSection: {
    paddingTop: Spacing.XXXL, // Margin above the text
    paddingBottom: Spacing.XXXL, // Margin below the button/footer
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: Spacing.XXXL,
    marginBottom: Spacing.XXXL, // Margin below the text
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#222',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: Spacing.MD,
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonOuterWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.XXL, // Margin below the button
    marginTop: Spacing.MD, // Margin above the button (in addition to text container's bottom margin)
  },
  buttonWrapper: {
    width: '70%',
    shadowColor: ColorPalette.HOME_BLUE as string,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  updateButton: {
    paddingVertical: 16,
    borderRadius: 100,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: Spacing.MD,
  },
  footerText: {
    color: '#AAA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default UpdateAppModal;