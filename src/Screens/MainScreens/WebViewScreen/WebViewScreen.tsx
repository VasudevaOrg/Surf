import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import ColorPalette from '../../../config/ColorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import { goBack } from '../../../utils/navigationref';
import { Typography } from '../../../components/MainComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/MainComponents/Typography/Typography.types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../../types/navigation';
import ScreenWrapper from '../../../components/CustomComponents/ScreenWrapper/ScreenWrapper';

type WebViewScreenRouteProp = RouteProp<
  DashboardStackParamList,
  'WebViewScreen'
>;

const WebViewScreen = () => {
  const route = useRoute<WebViewScreenRouteProp>();
  const { url, title } = route.params;
  const [loading, setLoading] = useState(true);

  const acceptCookiesJS = `
    (function() {
      const commonSelectors = [
        '#onetrust-accept-btn-handler',
        '.cc-nb-okagree',
        '.cc-btn.cc-dismiss',
        '#cookie-accept',
        '.accept-all-cookies',
        'button[id*="accept"]',
        'button[class*="accept"]',
        'a[id*="accept"]',
        'a[class*="accept"]'
      ];

      function tryAccept() {
        for (const selector of commonSelectors) {
          const btn = document.querySelector(selector);
          if (btn && typeof btn.click === 'function') {
            btn.click();
            return true;
          }
        }
        return false;
      }

      // Try immediately
      if (!tryAccept()) {
        // If not found, try again after short delays
        setTimeout(tryAccept, 1000);
        setTimeout(tryAccept, 3000);
      }

      // Also use MutationObserver to catch late-loading banners
      const observer = new MutationObserver((mutations) => {
        if (tryAccept()) {
          observer.disconnect();
        }
      });

      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    })();
    true;
  `;

  return (
    <ScreenWrapper
      backgroundColor={ColorPalette.WHITE}
      edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <ArrowLeftIcon size={24} color={ColorPalette.TEXT_GREY_500} />
        </TouchableOpacity>
        <Typography
          text={title}
          variant={TypographyVariant.H6_MEDIUM}
          customTextStyles={styles.headerTitle}
        />
        <View style={styles.placeholder} />
      </View>

      <WebView
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        injectedJavaScript={acceptCookiesJS}
        javaScriptEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={ColorPalette.PURPLE_200 as string}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: ColorPalette.TEXT_GREY_500,
  },
  placeholder: {
    width: 40,
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
});

export default WebViewScreen;
