import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Creators from '../../store/ducks/schedulings';

class EndSchedulingButton extends Component{

    endScheduling = (id) => {
        this.props.endSchedulingRequest(id);

        this.props.navigation.navigate('Home');
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.endScheduling(this.props.idScheduling)} style={{flexDirection: 'row', padding: 13,}}>
                <Text style={{color: '#fff', marginRight: 5,}}>Finalizar</Text>
                <Icon
                    type="font-awesome"
                    name="check"
                    color="#fff"
                    size={16}s
                />
            </TouchableOpacity>
        );
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(EndSchedulingButton);

