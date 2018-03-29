import React, { Component } from 'react';
import { Animated, View, PanResponder, Dimensions } from 'react-native';

// define screen widths
const SCREEN_WIDTH = Dimensions.get('window').width;

// define swipe threshold
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.6;

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
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swiped right!');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swiped left');
        } else {
          this.resetPosition();
        }
      }
    })
  }

  // helper methods
    // resets card position when gesture ends
  resetPosition () {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }
    /*
      the getCardStyle method returns the style object for
      each Animated.View component
    */
  getCardStyle () {
    // set up rotation using .interpolate()
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }
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
            key={item.id}
            style={this.getCardStyle()}
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
