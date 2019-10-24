import React, { Component } from 'react';

import { View, StyleSheet, AsyncStorage, ScrollView, Text, Alert} from 'react-native';
import { Avatar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Creators from '../store/ducks/schedulings';
import Loading from './components/loading';

class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                foto: null,
                nome: null,
                email: null,
                sexo: null,
                data_nasc: null,
                status: null,
                cpf: null,
                cnh: null,
                uf: null,
                cidade: null,
                bairro: null,
                rua: null,
                numero: null,
                cep: null,
                ddd: null,
                telefone: null,
            },
        };
    }

    async componentDidMount(){

        const user  = JSON.parse(await AsyncStorage.getItem('@AgroCactos:user'));

        if(!user){
            Alert.alert("Erro", "É necessario fazer login novamente.");

            this.props.navigation.navigate('Login');
        }else
            this.setState({ user });

    }

    render() {
        return(
            <View style={styles.content}>
                {/* <Loading loading={this.props.state.schedulings.loading}/> */}
                <ScrollView>
                    <View style={styles.foto}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={{uri: this.state.user.foto}}
                        />
                    </View>
                    <View style={[styles.fieldset, {marginBottom: 10,}]}>
                        <View style={styles.fieldset_title}>
                            <Text style={styles.label_title}>Informações do motorista</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Nome:</Text>
                            <Text style={{padding: 10,}}>{this.state.user.nome}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>E-mail:</Text>
                            <Text style={{padding: 10,}}>{this.state.user.email}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Data de nascimento:</Text>
                            <Text style={{padding: 10,}}>{this.state.user.data_nasc}</Text>
                        </View>
                        <View style={styles.dados}>
                            <Text style={styles.label}>Sexo:</Text>
                            <Text style={{padding: 10,}}>{this.state.user.sexo}</Text>
                        </View>
                        <View style={styles.dados}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={{padding: 10,}}>{this.state.user.status}</Text>
                        </View>
                    </View>
                    <View style={[styles.fieldset, {marginBottom: 10,}]}>
                            <View style={styles.fieldset_title}>
                                <Text style={styles.label_title}>Documentos</Text>
                            </View>
                            <View style={[styles.dados, styles.bottomDivider]}>
                                <Text style={styles.label}>CPF:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.cpf}</Text>
                            </View>
                            <View style={[styles.dados, styles.bottomDivider]}>
                                <Text style={styles.label}>CNH:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.cnh}</Text>
                            </View>
                    </View>
                    <View style={[styles.fieldset, {marginBottom: 10,}]}>
                            <View style={styles.fieldset_title}>
                                <Text style={styles.label_title}>Endereço</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>UF:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.uf}</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>Cidade:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.cidade}</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>Bairro:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.bairro}</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>Rua:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.rua}</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>Numero:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.numero}</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>CEP:</Text>
                                <Text style={{padding: 10,}}>{this.state.user.cep}</Text>
                            </View>
                    </View>
                    <View style={[styles.fieldset, {marginBottom: 20,}]}>
                            <View style={styles.fieldset_title}>
                                <Text style={styles.label_title}>Contato</Text>
                            </View>
                            <View style={styles.dados}>
                                <Text style={styles.label}>Telefone:</Text>
                                <Text style={{padding: 10,}}>({this.state.user.ddd}) {this.state.user.telefone}</Text>
                            </View>
                    </View>
                    {/* <View style={{marginBottom: 20, alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.button}
                        >
                            <Text style={{color: '#fff'}}>Sair</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </View>

        );
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    foto: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: "center",
    },
    fieldset: {
        marginLeft: 10,
        marginRight: 10, 
        backgroundColor: '#eee',
        borderRadius: 10,
        marginTop: 10,
    },
    fieldset_title: {
        backgroundColor: '#ddd',
        padding: 5,
        fontWeight: 'bold',
    },
    label_title: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        padding: 10,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    dados: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // button: {
    //     width: 340,
    //     height: 45,
    //     backgroundColor: '#f00',
    //     marginTop: 10,
    //     borderRadius: 10,
    //     padding: 12,
    //     alignItems: "center",
    // },
});
