import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('./assets/images/Check_Me_1.png')} style={styles.logo} />
                <Text style={styles.headerText}>
                    Learn about anything, instantly
                </Text>
                <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={[styles.arrowButtonText, { alignSelf: 'center' }]}>›</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.descriptionText}>
                    Check-Me is an AI-powered image recognition app that helps you identify objects in your photos.
                </Text>
                <Text style={styles.descriptionText}>
                    Simply point, click, and know! Check-Me reveals object details instantly, uncovering the world around you.
                </Text>
            </View>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 90,
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -120,
        marginBottom: 120,
    },
    arrowButton: {
        backgroundColor: '#8E7AB5',
        borderRadius: 45,
        paddingHorizontal: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowButtonText: {
        fontSize: 50,
        color: '#fff',
        marginBottom: 10,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    descriptionText: {
        fontSize: 14,
        textAlign: 'justify',
        marginBottom: 10,
        lineHeight: 20,
    },
    poweredContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
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

export default StartScreen;