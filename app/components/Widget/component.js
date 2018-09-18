import React, { Component } from 'react';
const { ipcRenderer } = require('electron');
const ms = require('pretty-ms');

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
    return (
      <div style={{ backgroundColor: 'gray', width: '100%', height: '100%' }}>
        <div>{ms(this.state.time)}</div>
        <div onClick={() => {
          ipcRenderer.send('closeWidget');
        }}><strong>CLOSE WIDGET</strong></div>

        <div onClick={() => {
          ipcRenderer.send('startTimer', 'dataToSend');
        }}><strong>START</strong></div>

        <div onClick={() => {
          ipcRenderer.send('stopTimer', 'dataToSend');
          setTimeout(()=>self.setState({ time: 0 }), 300)
        }}><strong>STOP</strong></div>
      </div>
    );
  }
}