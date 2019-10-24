import React, { Component } from 'react';

import { View, Text, StyleSheet, AsyncStorage, Alert, ScrollView} from 'react-native';


export default class Scheduling extends Component {

    constructor(props){
        super(props);

        this.state = {
            scheduling: {},
        };
    }

    async componentDidMount(){

        const user = JSON.parse(await AsyncStorage.getItem('@AgroCactos:user'));

        if(!user){
            Alert.alert("É necessario efetuar login novamente");

            this.props.navigation.navigate('Login');
        }

        this.setState({ scheduling: this.props.navigation.getParam('scheduling', {}) });
    }
    
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.fieldset}>
                        <View style={styles.fieldset_title}>
                            <Text style={styles.label_title}>Dados da propriedade</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Nome:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.nameProperty}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Proprietário:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.farmerName}</Text>
                        </View>
                        <View style={styles.dados}>
                            <Text style={styles.label}>Endereço:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.endereco}</Text>
                        </View>
                    </View>
                    <View style={[styles.fieldset, {marginBottom: 10,}]}>
                        <View style={styles.fieldset_title}>
                            <Text style={styles.label_title}>Dados do agendamento</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Data e hora:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.data} - {this.state.scheduling.hora}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Tarefas:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.tarefas}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Tempo:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.tempo}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Serviço:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.servico}</Text>
                        </View>
                        <View style={[styles.dados, styles.bottomDivider]}>
                            <Text style={styles.label}>Combustível:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.quantidade_combustivel} L</Text>
                        </View>
                        <View style={styles.dados}>
                            <Text style={styles.label}>Descrição:</Text>
                            <Text style={{padding: 10,}}>{this.state.scheduling.descricao}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    fieldset: {
        marginLeft: 10,
        marginRight: 10, 
        backgroundColor: '#eee',
        borderRadius: 10,
        marginTop: 20,
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
    bottomDivider: {
        borderBottomColor: '#aaa',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
