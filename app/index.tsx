import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const video = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (video.current) {
        await video.current.playAsync(); // Uruchomienie wideo po załadowaniu
      }
    };
    if (Platform.OS !== 'web') {
      playVideo();
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.warning}>Wideo działa tylko na telefonie (Android/iOS)</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../assets/video.mp4')}
        resizeMode="contain"
        useNativeControls={false}
        isLooping
        shouldPlay={true} // automatyczne odtwarzanie
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
  warning: {
    color: '#fff',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});
