import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { uploadPhoto } from '@/lib/photo-storage';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<'ephemeral' | 'curated'>('ephemeral');
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const capturePhoto = async () => {
    if (!cameraRef.current || isCapturing) {
      return;
    }

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
      });

      if (photo?.uri) {
        setCapturedUri(photo.uri);
      }
    } catch {
      Alert.alert('Capture failed', 'We could not take that photo. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const savePhoto = async () => {
    if (!capturedUri) {
      return;
    }

    try {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          'Permission needed',
          'Allow photo-library access to save this image to your device.',
        );
        return;
      }

      await MediaLibrary.saveToLibraryAsync(capturedUri);
      Alert.alert('Saved', 'Your photo was saved to the device.');
    } catch {
      Alert.alert('Save failed', 'We could not save this photo. Please try again.');
    }
  };

  const postToInstaGrid = () => {
    void uploadCapturedPhoto('curated', 'Posted to Insta Grid');
  };

  const sendAsSnap = () => {
    void uploadCapturedPhoto('ephemeral', 'Sent as Snap');
  };

  const uploadCapturedPhoto = async (
    uploadMode: 'ephemeral' | 'curated',
    successMessage: string,
  ) => {
    if (!capturedUri || isUploading) {
      return;
    }

    setIsUploading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You need to be logged in to upload a photo.');
      }

      await uploadPhoto({
        uri: capturedUri,
        userId: user.id,
        mode: uploadMode,
      });
      setCapturedUri(null);
      Alert.alert('Success', successMessage);
    } catch (error) {
      Alert.alert(
        'Upload failed',
        error instanceof Error ? error.message : 'We could not upload this photo.',
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Camera color="#fff" size={48} />
        <Text style={styles.text}>Camera access is required for Snapsgram</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedUri }} style={styles.previewImage} />
        <View style={styles.previewOverlay}>
          <Text style={styles.previewTitle}>
            {mode === 'ephemeral' ? 'Your Snap' : 'Your Insta post'}
          </Text>

          <View style={styles.previewActions}>
            <TouchableOpacity
              style={styles.secondaryAction}
              onPress={() => setCapturedUri(null)}
            >
              <Text style={styles.secondaryActionText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryAction} onPress={savePhoto}>
              <Text style={styles.primaryActionText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isUploading}
              style={[styles.primaryAction, styles.instaAction]}
              onPress={postToInstaGrid}
            >
              <Text style={styles.primaryActionText}>
                {isUploading ? 'Uploading…' : 'Post to Insta Grid'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isUploading}
              style={[styles.primaryAction, styles.snapAction]}
              onPress={sendAsSnap}
            >
              <Text style={styles.primaryActionText}>
                {isUploading ? 'Uploading…' : 'Send as Snap'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'ephemeral' && styles.activeToggle]}
            onPress={() => setMode('ephemeral')}
          >
            <Sparkles color="#fff" size={18} />
            <Text style={styles.toggleText}>Snap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'curated' && styles.activeToggle]}
            onPress={() => setMode('curated')}
          >
            <ImageIcon color="#fff" size={18} />
            <Text style={styles.toggleText}>Insta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            accessibilityLabel={`Capture ${mode} photo`}
            style={[
              styles.shutter,
              { borderColor: mode === 'ephemeral' ? '#FFFC00' : '#E1306C' },
            ]}
            onPress={capturePhoto}
            disabled={isCapturing}
          />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  previewOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.72)',
  },
  previewTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },
  previewActions: {
    gap: 10,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 13,
  },
  instaAction: {
    backgroundColor: '#E1306C',
  },
  snapAction: {
    backgroundColor: '#FFFC00',
  },
  primaryActionText: {
    color: '#000',
    fontWeight: '700',
  },
  secondaryAction: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
  },
  secondaryActionText: {
    color: '#fff',
    fontWeight: '700',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 24,
  },
  text: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#E1306C',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    gap: 10,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    gap: 6,
  },
  activeToggle: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBar: {
    alignItems: 'center',
    marginBottom: 40,
  },
  shutter: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 5,
    backgroundColor: 'transparent',
  },
});
