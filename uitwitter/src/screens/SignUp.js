import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { COLORS } from '../assets/theme';
import {TextInput} from '@react-native-material/core';

const SignUp = () => {
    return (
        <View style={styles.signupContainer}>
            <View style={styles.iconContainer}>
                <Image source={require("../assets/images/twitterIcon.png")} />
            </View>
            <View>
                <Text style={styles.acountContainer}>Create your account</Text>
                <View>
                    <TextInput label="Label" variant="outlined" placeholder='Email' />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signupContainer: {
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25
    },
    iconContainer: {
        alignItems: 'center',
    },
    acountContainer: {
        color: COLORS.black,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    }
});

export default SignUp;
