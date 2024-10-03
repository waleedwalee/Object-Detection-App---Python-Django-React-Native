import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
    const { imageUri, detectedObjects } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUri }}
                style={{
                    width: '100%',
                    height: 300, // Set a fixed height for the image
                    resizeMode: 'contain',
                }}
            />
            <Text style={styles.heading}>Detected Objects:</Text>
            {detectedObjects.map((object, index) => (
                <View key={index}>
                    <Text style={styles.text}>
                        {object.name} ({object.confidence.toFixed(2)})
                    </Text>
                </View>
            ))}
            <View style={styles.poweredContainer}>
                <Text style={styles.poweredByText}>
                    Powered By CodeAstro
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#8E7AB5',
        marginBottom: 10,
    },
    heading: {
        color: '#8E7AB5',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 50,
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
        paddingLeft: 20,
    },
    poweredContainer: {
        position: 'absolute',
        bottom: 10,
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
});

export default ResultScreen;