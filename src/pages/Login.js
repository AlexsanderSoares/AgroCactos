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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Creators from '../store/ducks/schedulings';
import api from '../services/api';
import Loading from './components/loading';
import { LOGIN_URL } from '../config';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    static navigationOptions = {
        header: null,
    };

    redirect = (rota) => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: rota }),
            ],
        }));
    }


    login = async () => {

        try{

            this.setState({ loading: true });

            const response = await api.post(LOGIN_URL(), {
                email: this.state.email,
                password: this.state.password,
            });

            const { user, acess_token, expires } = response.data;

            await AsyncStorage.multiSet([
                ['@AgroCactos:user', JSON.stringify(user)],
                ['@AgroCactos:acess_token', acess_token],
                ['@AgroCactos:expires', JSON.stringify(expires)],
            ]);

            this.setState({ loading: false });

            this.redirect('Home');

        }catch(response){

            this.setState({ loading: false });
            Alert.alert('Erro', JSON.stringify(response));

        }

    }

    diffDate = (date1, date2) => {
        return Math.abs(date1.getTime() - date2.getTime());
    }

    async componentDidMount(){

        const user = JSON.parse(await AsyncStorage.getItem('@AgroCactos:user'));
        const token = await AsyncStorage.getItem('@AgroCactos:acess_token');
        const expires = JSON.parse(await AsyncStorage.getItem('@AgroCactos:user'));
            
        if(user && token && expires)
            this.redirect('Home');
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
                        AgroCactos
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
                    onPress={() => this.login()}
                    style={styles.button}
                >
                    <Text style={{color: '#fff',}}>Entrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
        textAlign: 'center',
    },
    img: {
        width: 80,
        height: 92,
        marginRight: 15,
    }
 });
