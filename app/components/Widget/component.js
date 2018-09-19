import React, { Component } from 'react';
/** import ipcRenderer to send events for start or stop timer. */
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
    /** Event listners to start, stop timer. */
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
        {/* Display Timer */}
        <div><h3>Timer: {ms(this.state.time)}</h3></div>

        {/* Start button to open timer */}
        {!this.state.isOn && <div style={styles.startLabel} onClick={() => {
          this.setState({ isOn: true })
          ipcRenderer.send('startTimer', 'dataToSend');
        }}><strong>START TIMER</strong></div>}

        {/* Stop button to close timer */}
        {this.state.isOn && <div style={styles.stopLabel} onClick={() => {
          ipcRenderer.send('stopTimer', 'dataToSend');
          setTimeout(() => self.setState({ time: 0, isOn: false }), 300)
        }}><strong>STOP TIMER</strong></div>}

        {/* Close button to close widget */}
        <div style={styles.closeDiv} onClick={() => ipcRenderer.send('closeWidget')}>
          <strong><span style={styles.closeSign}>CLOSE</span></strong>
        </div>
      </div>
    );
  }
}