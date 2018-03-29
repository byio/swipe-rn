import React, { Component } from 'react';
import { Animated, View, PanResponder } from 'react-native';

class Deck extends Component {
  // lifecycle methods
  componentWillMount () {
    // init new animation
    this.position = new Animated.ValueXY();
    // pan responder handlers
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gesture) => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {

      }
    })
  }

  // helper methods
    /*
      the renderCards method will receive data and
      renderCard props
    */
  renderCards () {
    return this.props.data.map (item => {
      return this.props.renderCard(item);
    });
  }

  // render method
  render () {
    return (
      <Animated.View
        style={this.position.getLayout()}
        {...this._panResponder.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>
    );
  }
}

export default Deck;
