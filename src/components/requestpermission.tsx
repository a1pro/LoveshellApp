import { PermissionsAndroid, Platform, Alert } from 'react-native';

// Camera/Gallery Permission Function
export const requestPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const cameraGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera access to take photos/videos',
                    buttonNeutral: 'Ask Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            const storageGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs storage access to select media',
                    buttonNeutral: 'Ask Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && 
                storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                Alert.alert('Permissions Denied', 'Camera & Storage permissions required');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};


