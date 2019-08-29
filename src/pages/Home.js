import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
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
              titleStyle={obj.item.finished ? {color: '#aa0'} : {}}
          />
        );
    }

    componentDidMount(){

        this.isConnected();

        this.props.schedulingsRequest();

    }

    componentDidUpdate(){
        if(this.props.state.schedulings.error){
            Alert.alert("Erro", this.props.state.schedulings.error);
            this.props.cleanError();
        }
    }

    isConnected = async () => {
        const isConnected = await NetInfo.fetch().isConnected;

        Alert.alert("TESTE", isConnected);

        this.setState({ isConnected });
    }

    render() {
        return (
          <View style={styles.content}>
            {/* <Loading loading={this.props.state.schedulings.loading && this.state.isConnected}/> */}
                <FlatList 
			              data={this.props.state.schedulings.data}
			              renderItem= {this.renderItem}
			              keyExtractor={(item) => item.id.toString()}
                    extraData={this.props.state}
                    refreshControl={
                      <RefreshControl
                          refreshing={this.props.state.schedulings.loading}
                          onRefresh={() => this.props.schedulingsRequest()}
                      />
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
