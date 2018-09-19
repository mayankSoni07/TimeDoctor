import React, { Component } from 'react';
const { ipcRenderer } = require('electron');
const ms = require('pretty-ms');

import { styles } from './component.styles';

let self;

export default class component extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      time: 0, isOn: false
    }
    ipcRenderer.on('ready', (event, data) => {
      this.setState({ time: data.time, isOn: data.isOn })
    })
    ipcRenderer.on('time', (event, data) => {
      this.setState({ time: data.time, isOn: data.isOn });
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <div><h3>Timer: {ms(this.state.time)}</h3></div>

        {!this.state.isOn && <div style={styles.startLabel} onClick={() => {
          this.setState({isOn: true})
          ipcRenderer.send('startTimer', 'dataToSend');
        }}><strong>START</strong></div>}

        {this.state.isOn &&<div style={styles.stopLabel} onClick={() => {
          ipcRenderer.send('stopTimer', 'dataToSend');
          setTimeout(() => self.setState({ time: 0, isOn: false }), 300)
        }}><strong>STOP</strong></div>}

        <div onClick={() => ipcRenderer.send('closeWidget')}>
        <strong><span style={styles.closeSign}>X CLOSE</span></strong>
        </div>
      </div>
    );
  }
}