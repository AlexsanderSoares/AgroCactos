import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class ProfileButtonComponent extends Component{
    render() {
        return(
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profile')}
                    style={styles.button}
                >
                    <Icon name="person" color="#fff"/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(ProfileButtonComponent);

const styles = StyleSheet.create({
    button: {
        width: 60, 
        padding: 10,
    }
});


