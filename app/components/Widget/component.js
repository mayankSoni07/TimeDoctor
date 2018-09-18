import React, { Component } from 'react';
const { ipcRenderer } = require('electron');

class component extends React.Component {
  constructor(props) {
    super(props);
    ipcRenderer.on('ready', (event, data) => {
      console.log('component ready', event, data);
    })
  }
  render() {
    return (
      <div onClick={() => {
          ipcRenderer.send('reply', 'dataToSend and close')
          window.close()
      }}>Close</div>
    );
  }
}

module.exports = component;
