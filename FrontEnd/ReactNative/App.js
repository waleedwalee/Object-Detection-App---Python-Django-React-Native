import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import ResultScreen from './ResultScreen';
import StartScreen from './StartScreen';

const SERVER_URL = 'http://192.168.31.153:8000/upload/';

const HomeScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');

        const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
      }
    })();
  }, []);

  const handleCameraPress = async () => {
    if (hasCameraPermission === null || hasCameraPermission === false) {
      Alert.alert('Camera permission is not granted yet.');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('Camera Picker Result:', pickerResult);

    if (!pickerResult.canceled) {
      if (pickerResult.assets && pickerResult.assets.length > 0) {
        const imageUri = pickerResult.assets[0].uri;
        uploadImage(imageUri, navigation);
      } else {
        console.error('Camera did not return a valid image URI.');
      }
    }
  };

  const openGallery = async () => {
    if (hasMediaLibraryPermission === null || hasMediaLibraryPermission === false) {
      Alert.alert('Media library permission is not granted yet.');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('Gallery Picker Result:', pickerResult);

    if (!pickerResult.canceled) {
      if (pickerResult.assets && pickerResult.assets.length > 0) {
        const imageUri = pickerResult.assets[0].uri;
        uploadImage(imageUri, navigation);
      } else {
        console.error('Gallery did not return a valid image URI.');
      }
    }
  };

  const uploadImage = async (uri, navigation) => {
    setUploading(true);
    if (!uri) {
      console.error('No URI provided to uploadImage.');
      return;
    }

    console.log('Uploading Image URI:', uri);

    const newImageUri = "file:///" + uri.split("file:/").join("");
    const formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: 'image/jpeg',
      name: `image_${Date.now()}.jpg`, // Generate a unique name using timestamp
    });

    try {
      const response = await axios.post(SERVER_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const resultImageUri = `${response.data.result_image_url}?timestamp=${Date.now()}`; // Append timestamp
        const detectedObjectsList = response.data.detected_objects;

        console.log('Response from server:', response.data);

        setUploading(false);
        navigation.navigate('Result', {
          imageUri: resultImageUri,
          detectedObjects: Array.isArray(detectedObjectsList) ? detectedObjectsList : [],
        });

        console.log('Response from server:', response.data);
      } else {
        setUploading(false);
        setError('Unexpected response from server:');
        console.error('Unexpected response from server:', response);
      }
    } catch (error) {
      setUploading(false);
      setError('Error uploading image:');
      console.error('Error uploading image:', error.message);
      console.error('Error uploading image:', error.response ? error.response.data : '');
      Alert.alert('Error uploading image:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hi, Welcome to CheckMe</Text>
      <Text style={styles.subtitle}>Learn about anything, instantly</Text>
      <View style={styles.optionsContainer}>
        <Text style={styles.optionTitle}>You can detect objects in 2 ways:</Text>
        <Text style={styles.optionText}>
          Option 1: Open the camera and click theshot and app will detect the objects
        </Text>
        <Text style={styles.optionText}>
          Option 2: You can use gallery image. Open the gallery from the button below and choose the image to detect objects
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCameraPress}>
          <Text style={styles.buttonText}>Open Your Camera</Text>
          <Image source={require('./assets/images/CameraImg.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>Open Your Gallery</Text>
          <Image source={require('./assets/images/Add1.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.poweredContainer}>
        <Text style={styles.poweredByText}>
          Powered By CodeAstro
        </Text>
      </View>
      {uploading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E7AB5" />
          <Text style={styles.loadingText}>Uploading and processing image...</Text>
        </View>
      ) : (
        error ? (
          <View>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null
      )}
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide the header for Home screen
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Results' }} // You can set title to empty string to remove the title from Result screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#8E7AB5',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10,
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'pace-between',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: -10,
    backgroundColor: '#8E7AB5',
    borderRadius: 50,
    width: '98%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    width: 32,
    height: 24,
    tintColor: '#FFFFFF',
  },
  poweredContainer: {
    position: 'absolute',
    bottom: 20,
    width: '110%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#8E7AB5',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});

export default App;