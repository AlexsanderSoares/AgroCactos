import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native';

const Loading = () => {
    return(
            <View
                style={{
                    ...StyleSheet.absoluteFill,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
            >
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
    );
};

export default Loading;