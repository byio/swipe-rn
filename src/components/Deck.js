import React, { Component } from 'react';
import { Animated, View, PanResponder, Dimensions } from 'react-native';

// constants for hard-coded values
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_OUT_DURATION = 250 // ms

class Deck extends Component {
  // constructor
  constructor (props) {
    super(props);
    this.state = {
      cardIndex: 0
    };
  }

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
          this.cardExit('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.cardExit('left');
        } else {
          this.resetPosition();
        }
      }
    })
  }

  // helper methods
    // card programmatically exits specified side of screen
  cardExit (direction) {
    // if direction is right, x = SCREEN_WIDTH, otherwise, x = -SCREEN_WIDTH
    const x = direction === 'right' ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }
    // callback function after cardExit animation
  onSwipeComplete (direction) {
    const { data } = this.props;
    const item = data[this.state.cardIndex];
    console.log(`${item.text} was swiped ${direction}.`);
  }
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
