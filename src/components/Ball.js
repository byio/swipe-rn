import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class Ball extends Component {
  // lifecycle methods
  componentWillMount () {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 20, y: 50 }
    }).start();
  }

  // render method
  render () {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball}/>
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  }
};

export default Ball;
