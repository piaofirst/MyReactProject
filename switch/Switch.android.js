// import React, {Component} from 'react';
// import {
//     SwitchAndroid
// } from 'react-native';
var React = require('react');
var ReactNative = require('react-native');
var {
    SwitchAndroid
} = ReactNative;

// export class Switch extends Component {
var Switch = React.createClass({
    getInitialState: function () {
        return {value: false};
    },

    _onValueChange: function (value) {
        this.setState({value: value});
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
    },

    render: function () {
        return (
            <SwitchAndroid
                onValueChange={this._onValueChange}
                value={this.state.value}
            />
        );
    }
});
module.exports = Switch;