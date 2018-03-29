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
    return this.props.data.map ((item, index) => {
      // check that card is first in deck, and animate
      if (index === 0) {
        return (
          <Animated.View
            style={this.position.getLayout()}
            {...this._panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }

  // render method
  render () {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
