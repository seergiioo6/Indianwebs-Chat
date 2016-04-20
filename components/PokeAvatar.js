/*
 * Module dependencies
 */

import React from 'react';

export default class PokeAvatar extends React.Component {
  render() {
    var url = `http://www.indianwebs.com/images/equipo/grandes/${this.props.url}`;
    return <div className="avatar-container">
      <img src={url} className="avatar" />
    </div>
  }
}
