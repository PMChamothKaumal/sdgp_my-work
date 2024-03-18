import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const Ocr = () => {
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: "photo" });
            if (!result.didCancel) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to pick image. Please try again.");
        }
    };

    const openCamera = async () => {
        try {
            const result = await launchCamera({ mediaType: "photo" });
            if (!result.didCancel) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error opening camera:", error);
            Alert.alert("Error", "Failed to open camera. Please try again.");
        }
    };

    const recognizeText = async () => {
        if (image) {
            setLoading(true);
            try {
                const result = await TextRecognition.recognize(image);
                if (result && result.text) {
                    setText(result.text);
                    for (let block of result.blocks) {
                        console.log('Block text:', block.text);
                        console.log('Block frame:', block.frame);

                        for (let line of block.lines) {
                            console.log('Line text:', line.text);
                            console.log('Line frame:', line.frame);
                        }
                    }
                } else {
                    setText('');
                    Alert.alert("Error", "No text found in the image.");
                }
            } catch (error) {
                //console.error("Error recognizing text:", error);
                Alert.alert("Error", "Failed to recognize text. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            setText('');
        }
    };

    useEffect(() => {
        recognizeText();
    }, [image]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Text Recognition</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>

                <Button onPress={pickImage} title='Pick Image' disabled={loading} />
            </View>

            <View style={{ flexDirection: "row", marginVertical: 10 }}>

                <Button onPress={openCamera} title='Open Camera' disabled={loading} />
            </View>
            {loading && <Text>Loading...</Text>}
            <Text style={{ textAlign: "justify", fontSize: 16, marginHorizontal: 20 }}>{text}</Text>
        </View>
    );
};

export default Ocr;
