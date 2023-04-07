import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../assets/theme';

MaterialCommunityIcons.loadFont();

const SignUp = () => {
    return (
        <View>
            <View>
                <MaterialCommunityIcons name="twitter" size={12} color={COLORS.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default SignUp;
