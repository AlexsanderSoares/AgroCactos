import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class ProfileButtonComponent extends Component{

    logout = async () => {

        const keys = [
            '@AgroCactos:user', 
            '@AgroCactos:acess_token', 
            '@AgroCactos:expires'
        ];

        await AsyncStorage.multiRemove(keys, err => {
            if(err)
                Alert.alert('Erro', 'Não foi possível efetuar login.');
            else
                this.props.navigation.navigate('Login');
        });



    }

    render() {
        return(
            <View>
                <TouchableOpacity
                    onPress={() => this.logout()}
                    style={styles.button}
                >
                    <Text style={{color: '#fff', marginRight: 5,}}>Sair</Text>
                    <Icon
                        type="font-awesome"
                        name="sign-out"
                        color="#fff"
                        size={18}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(ProfileButtonComponent);

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        padding: 13,
    }
});


