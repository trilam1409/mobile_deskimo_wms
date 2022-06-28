/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme, StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {request, PERMISSIONS} from 'react-native-permissions';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import {DOMAIN} from './src/configs/Endpoints';
import {Permission} from './src/services/PermissionService';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const debugging = `
     // Debug
     console = new Object();
     console.log = function(log) {
       window.webViewBridge.send("console", log);
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebView
        source={{uri: DOMAIN}}
        originWhitelist={['https://*']}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        domStorageEnabled
        allowsBackForwardNavigationGestures
        onLoad={() => {
          SplashScreen.hide();
        }}
        onLoadEnd={async () => {
          await Permission.requestPermission(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.CAMERA
              : PERMISSIONS.ANDROID.CAMERA,
          );
        }}
        injectedJavaScript={debugging}
        pullToRefreshEnabled
      />
    </SafeAreaView>
  );
};

export default App;
