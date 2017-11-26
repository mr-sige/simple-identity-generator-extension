/* eslint-disable react/prop-types */
import React from 'react';

export default class Message extends React.Component {
  render() {
    return(
      <label>{this.props.message}</label>
    );
  }
}
