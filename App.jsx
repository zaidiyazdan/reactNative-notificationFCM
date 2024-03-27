import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListener,
  requestUserPermission,
  getToken,
} from './commonUtils.js';
// import admin from 'firebase-admin';

// // Initialize the SDK with your Firebase project credentials
// import serviceAccount from './android/app/google-services.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// async function sendNotification(token, title, body) {
//   try {
//     const message = {
//       notification: {
//         title: title,
//         body: body
//       },
//       token: token
//     };
//     const response = await admin.messaging().send(message);
//     console.log('Notification sent successfully:', response);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// }
function App() {
  const isDarkMode = useColorScheme() === 'dark';


  // For handling foreground messages
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getToken();
  });

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="white"
      />
      {/* <Button onPress={() => sendNotification(token, 'title', 'body')}>Click</Button> */}
      <>
        <View>
          <Text style={styles.sectionTitle}>Hello, Welcome to Nofify</Text>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
