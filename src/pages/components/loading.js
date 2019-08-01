import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';

export default function Loading({ loading }){
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={loading}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
            >
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        </Modal>
    );
}