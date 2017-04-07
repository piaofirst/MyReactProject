import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';

// var Switch = require('./Switch');
// import Switch from './Switch';
// export class CrossPlatform extends Component {
var CrossPlatform = React.createClass({
    getInitialState: function () {
        return {val: false};
    },

    _onValueChange: function (val) {
        this.setState({val: val})
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
    },

    render: function () {
        var colorClass = this.state.val ? styles.blueContainer : styles.redContainer;
        return (
            <View style={[styles.container, colorClass]}>
                <Text style={styles.welcome}>
                    Make me blue!
                </Text>
                <Switch onValueChange={this._onValueChange}
                value={this.state.val}/>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueContainer: {
        backgroundColor: '#5555FF'
    },
    redContainer: {
        backgroundColor: '#FF5555'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
module.exports = CrossPlatform;