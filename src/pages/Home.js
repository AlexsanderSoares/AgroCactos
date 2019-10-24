import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, AsyncStorage, Alert, RefreshControl } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";

import Creators from '../store/ducks/schedulings';
import Loading from './components/loading';


class Home extends Component {

    constructor(props){
      super(props);

      this.state = {
          isConnected: false,
      };

    }

    listSchedulings = () => {

      this.props.schedulingsRequest();

    }

    async componentDidMount(){

        const user = JSON.parse(await AsyncStorage.getItem('@AgroCactos:user'));

        if(!user){
            Alert.alert("É necessario efetuar login novamente");

            this.props.navigation.navigate('Login');
        }

        this.listSchedulings();
      
    }

    endSchedulingError = (id) => {
        const scheduling = this.props.state.schedulings.schedulingsError.find(s => s === id);

        return scheduling !== undefined;
    }

    schedulingFinished = (id) => {
      const scheduling = this.props.state.schedulings.schedulingsFinished.find(s => s === id);

      return scheduling !== undefined;
    }

    renderItem = (obj) => {
        return (
          <ListItem
              title={obj.item.nameProperty}
              subtitle={obj.item.servico}
              onPress={() => this.props.navigation.navigate('Scheduling', {
                scheduling: obj.item,
              })}
              chevron={{color: '#000', size: 25,}}
              bottomDivider
              titleStyle={
                this.endSchedulingError(obj.item.id) ? {color: '#f00'} :
                this.schedulingFinished(obj.item.id) ? {color: '#aa0'} : {}
              }
          />
        );
    
    }

    renderEmptyListComponent = () => (
      // <View style={styles.listEmptyContent}>
        <Text style={{color: '#999'}}>Nenhum agendamento até o momento</Text>
      // </View>
    );

    render() {
        return (
          <View style={styles.content}>
                    <FlatList 
                        data={this.props.state.schedulings.data}
                        renderItem= {this.renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={this.props.state}
                        refreshControl={
                          <RefreshControl
                              refreshing={this.props.state.schedulings.loading}
                              onRefresh={() => this.listSchedulings()}
                          />
                        }
                        ListEmptyComponent={this.renderEmptyListComponent()}
                        contentContainerStyle={
                          this.props.state.schedulings.data.length === 0
                          ?
                              {flex: 1, alignItems: 'center', justifyContent: 'center',}
                          : 
                              {}
                        }
                    />
          </View>
        );
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  content: {
      flex: 1,
      justifyContent: 'center',
  },
  // listEmptyContent: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   alignItems: 'center',
  //   height: content.height,
  // },
  list_titulo: {
      fontSize: 20,
      color: '#000',
  }, 
  list_subtitulo: {
      fontSize: 15,
      color: '#555',
  }, 
  list_item: {
      backgroundColor: '#ddd',
      height: 80, 
      padding: 15,
  },
  content_msg: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});
