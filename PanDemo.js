var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    PanResponder
} = ReactNative;

var CIRCLE_SIZE = 40;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';

var PanResponderExample = React.createClass({
    //设置一些初始值
    _panResponder: {},
    _previousLeft: 0,
    _previousTop: 0,
    _circleStyles: {},
    circle: null,

    getInitialState: function () {
        return {
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
        }
    },

    componentWillMount: function () {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
            }
        };
    },

    componentDidMount: function () {
        this._updatePosition();
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View
                    ref={(circle) => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}/>
                <Text>
                    {this.state.numberActiveTouches} touches,
                    dx; {this.state.dx},
                    dy:{this.state.dy},
                    vx:{this.state.vx},
                    vy:{this.state.vy}
                </Text>
            </View>
        );
    },

    //_highlight和_unHighlight被PanResponder方法调用,
    //给用户提供视觉反馈
    _highlight: function () {
        this.circle && this.circle.setNativeProps({
            style: {backgroundColor: CIRCLE_HIGHLIGHT_COLOR},
        });
    },

    _unHighlight: function () {
        this.circle && this.circle.setNativeProps({
            style: {backgroundColor: CIRCLE_COLOR},
        });
    },

    //我们使用setNativeProps直接控制圆形的位置。
    _updatePosition: function () {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    },
    _handleStartShouldSetPanResponder: function (e: Object, gestureState: Object): boolean {
        //当用户按下圆形时，应该被激活吗？
        return true;
    },

    _handleMoveShouldSetPanResponder: function (e: Object, gestureState: Object): boolean {
        //当用户触摸并移动圆形时，需要被激活吗？
        return true;
    },

    _handlePanResponderGrant: function (e: Object, gestureState: Object) {
        this._highlight();
    },

    _handlePanResponderMove: function (e: Object, gestureState: Object) {
        this.setState({
            stateID: gestureState.stateID,
            moveX: gestureState.moveX,
            x0: gestureState.x0,
            y0: gestureState.y0,
            dx: gestureState.dx,
            dy: gestureState.dy,
            vx: gestureState.vx,
            vy: gestureState.vy,
            numberActiveTouches: gestureState.numberActiveTouches
        });

        //使用差值计算当前位置
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        this._updatePosition();
    },

    _handlePanResponderEnd: function (e: Object, gestureState: Object) {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    },

});

var styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container: {
        flex: 1,
        paddingTop: 64,
    },
});
module.exports = PanResponderExample;