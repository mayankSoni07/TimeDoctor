// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { Widget } from './Widget/Widget.jsx';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Hello</h2>
        <div onClick={() => {
          Widget()
        }}>
          Open Widget
        </div>
        {/* {this.state.openWidget && <Widget />} */}
      </div>
    );
  }
}
