import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import CloseIcon from '../../../assets/icons/CloseIcon';
import ColorPalette from '../../../config/ColorPalette';
import {Typography} from '../../MainComponents/Typography/Typography';
import {TypographyVariant} from '../../MainComponents/Typography/Typography.types';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

interface PaymentWebViewProps {
  visible: boolean;
  url: string;
  onClose: () => void;
  title?: string;
  cancelUrl?: string;
  onCancel?: () => void;
  failUrl?: string;
  onFail?: () => void;
  successUrl?: string;
  onSuccess?: () => void;
}

const PaymentWebView: React.FC<PaymentWebViewProps> = ({
  visible,
  url,
  onClose,
  title = 'Secure Payment',
  cancelUrl,
  onCancel,
  failUrl,
  onFail,
  successUrl,
  onSuccess,
}) => {
  if (!url) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Typography
            text={title}
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{color: ColorPalette.TEXT_GREY_500}}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon
              size={24}
              color={ColorPalette.TEXT_GREY_500 as string}
              style={undefined}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <WebView
            source={{uri: url}}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onLoadStart={e => {
              console.log('WebView Load Start URL:', e.nativeEvent.url);
            }}
            onNavigationStateChange={navState => {
              console.log('WebView Navigation URL:', navState.url);

              // Handle Cancellation
              if (
                cancelUrl &&
                onCancel &&
                navState.url.toLowerCase().includes(cancelUrl.toLowerCase())
              ) {
                console.log(
                  '!!! Payment Cancel URL Detected !!!',
                  navState.url,
                );
                onCancel();
                return;
              }

              // Handle Failure
              if (
                failUrl &&
                onFail &&
                navState.url.toLowerCase().includes(failUrl.toLowerCase())
              ) {
                console.log(
                  '!!! Payment Failure URL Detected !!!',
                  navState.url,
                );
                onFail();
                return;
              }

              // Handle Success
              if (
                successUrl &&
                onSuccess &&
                navState.url.toLowerCase().includes(successUrl.toLowerCase())
              ) {
                console.log(
                  '!!! Payment Success URL Detected !!!',
                  navState.url,
                );
                onSuccess();
                return;
              }
            }}
            renderLoading={() => (
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  size="large"
                  color={ColorPalette.PURPLE_200 as string}
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.ConnectLine,
    backgroundColor: ColorPalette.WHITE,
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.WHITE,
  },
  closeButton: {
    padding: 8,
  },
});

export default PaymentWebView;
