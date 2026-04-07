import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CloseIcon from '../../assets/icons/CloseIcon';
import ColorPalette from '../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../helpers/screenSize';
import { BorderRadius } from '../../config/globalStyles';

interface Product3DViewerProps {
  visible: boolean;
  onClose: () => void;
  modelUrl?: string;
  poster?: string;
}

const Product3DViewer: React.FC<Product3DViewerProps> = ({
  visible,
  onClose,
  modelUrl,
  poster,
}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
      <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #f4f4f4; }
        model-viewer { width: 100%; height: 100%; --poster-color: transparent; }
        .progress-bar { display: block; width: 33%; height: 10%; max-height: 2%; position: absolute; left: 50%; top: 50%; transform: translate3d(-50%, -50%, 0); border-radius: 25px; box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.5), 0px 0px 5px 1px rgba(0, 0, 0, 0.6); border: 1px solid rgba(255, 255, 255, 0.9); background-color: rgba(0, 0, 0, 0.5); }
        .update-bar { background-color: rgba(255, 255, 255, 0.9); width: 0%; height: 100%; border-radius: 25px; transition: width 0.3s; }
        #ar-button { background-image: url(https://modelviewer.dev/assets/ic_view_in_ar_new_googblue_48dp.png); background-repeat: no-repeat; background-size: 20px 20px; background-position: 12px 50%; background-color: #fff; position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; bottom: 16px; padding: 0px 16px 0px 40px; font-family: Roboto Regular, Helvetica Neue, sans-serif; font-size: 14px; color:#4285f4; height: 36px; line-height: 36px; border-radius: 18px; border: 1px solid #DADCE0; }
      </style>
    </head>
    <body>
      <model-viewer 
        src="${modelUrl}" 
        ${poster ? `poster="${poster}"` : ''}
        alt="A 3D model of a product" 
        shadow-intensity="1" 
        camera-controls 
        auto-rotate 
        touch-action="pan-y">
        <div class="progress-bar slot" slot="progress-bar">
          <div class="update-bar"></div>
        </div>
      </model-viewer>
    </body>
    </html>
  `;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={ColorPalette.ROSE_PURPLE_400}
            />
          )}
        />

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <View style={styles.closeIconWrapper}>
            <CloseIcon
              size={24}
              color={ColorPalette.WHITE as any}
              style={undefined}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.BACKGROUND_GREY_45,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 100,
    padding: 8,
  },
  closeIconWrapper: {
    width: getScreenWidth(11),
    height: getScreenHeight(5.2),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.WHITE_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product3DViewer;
