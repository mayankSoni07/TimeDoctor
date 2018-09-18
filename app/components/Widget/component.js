import React, { Component } from 'react';
const { ipcRenderer } = require('electron');
const ms = require('pretty-ms')
import { startTimerAction, stopTimerAction } from '../../actions/counter';

let self;

export default class component extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      time: 0
    }
    ipcRenderer.on('ready', (event, time) => {
      this.setState({ time: time })
    })
    ipcRenderer.on('time', (event, time) => {
      this.setState({ time: time });
    })
  }

  render() {
    console.log('time component js : ', this.state.time)
    return (
      <div style={{ backgroundColor: 'gray', width: '100%', height: '100%' }}>
        <div>{ms(this.state.time)}</div>
        <div onClick={() => {
          ipcRenderer.send('reply', 'dataToSend and close')
          window.close()
        }}><strong>X</strong></div>

        <div onClick={() => {
          ipcRenderer.send('startTimer', 'dataToSend');
        }}><strong>START</strong></div>

        <div onClick={() => {
          debugger
          self.setState({ time: 0 });
          ipcRenderer.send('stopTimer', 'dataToSend');
        }}><strong>STOP</strong></div>
      </div>
    );
  }
}