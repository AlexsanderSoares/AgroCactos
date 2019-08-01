import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Image, 
    AsyncStorage,
    Alert,
 } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../services/api';
import Loading from './components/loading';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: true,
        }
    }

    static navigationOptions = {
        header: null,
    };


    login = async () => {

        try{

            const response = await api.post('', {
                login: this.state.email,
                password: this.state.password,
            });

            const { user, access_token, expires_in } = response.data;

            await AsyncStorage.multiSet([
                ['@AgroCactos:user', JSON.stringify(user)],
                ['@AgroCactos:access_token', access_token],
                ['@AgroCactos:expires_in', JSON.stringify(expires_in)],
            ]);

            this.props.navigation.dipatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                ],
            }));

        }catch(response){

            Alert.alert('Erro', response.data.error);

        }

    }
    
    render() {
        return (
            <View style={styles.content}>
                <Loading loading={this.state.loading}/>
                <View style={styles.title_content}>
                    <Image
                        source={require('./imgs/logoAC.png')}
                        style={styles.img}
                    />
                    <Text style={styles.title}>
                        Agrocactos
                    </Text>
                </View>
                <TextInput 
                    textContentType="emailAddress" 
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    style={styles.inputText}
                    placeholder="E-mail"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput 
                    textContentType="password" 
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    style={styles.inputText}
                    placeholder="Senha"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.button}
                >
                    <Text style={{color: '#fff',}}>Entrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

 const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
    },
    inputText: {
        width: 250,
        height: 40,
        backgroundColor: '#ddd',
        padding: 10,
        color: '#000',
        marginTop: 5,
        borderRadius: 10,
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#679436',
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    title_content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: '#679436',
        fontFamily: 'Arial san-serif',
        fontWeight: 'bold',
    },
    img: {
        width: 80,
        height: 92,
        marginRight: 15,
    }
 });
