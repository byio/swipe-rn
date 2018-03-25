import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class Deck extends Component {
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
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
