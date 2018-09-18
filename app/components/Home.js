// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import { openWidget, closeWidget } from './Widget/Widget.jsx';
const ms = require('pretty-ms')

let timer, self;

export default class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
  }

  startTimer() {
    self.setState({
      isOn: true,
      time: self.state.time,
      start: Date.now() - self.state.time
    })
    self.timer = setInterval(() => self.setState({
      time: Date.now() - self.state.start
    }), 1);
  }

  stopTimer() {
    self.setState({ isOn: false })
    clearInterval(self.timer)
  }

  resetTimer() {
    self.setState({ time: 0, isOn: false })
  }

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
      
    return (
      <div data-tid="container">
        <h2>TIME DOCTOR</h2>
        <div onClick={() => openWidget()}>
          Open Widget
        </div>
        <div onClick={() => closeWidget()}>
          Close Widget
        </div>

        <div>
          <h3>timer: {ms(this.state.time)}</h3>
          {start}
          {resume}
          {stop}
          {reset}
        </div>

      </div>
    );
  }
}
