// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ipcMain = require('electron').remote.ipcMain;
import styles from './Home.css';
import { openWidget, closeWidget, sendTime } from './Widget/Widget.jsx';
const ms = require('pretty-ms')
import { startTimerAction, stopTimerAction } from '../actions/counter';

let self;

class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    ipcMain.on('startTimer', (event, data) => {
      console.log("startTimer", event, data);
      self.startTimer();
    })
    ipcMain.on('stopTimer', (event, data) => {
      console.log("stopTimer", event, data);
      self.resetTimer();
    })
  }

  startTimer() {
    self.props.startTimerAction({ isOn: true, time: 0, startTime: Date.now() });
    self.timer = setInterval(() => {
      sendTime(Date.now() - self.props.startTime);
      self.props.startTimerAction({ time: Date.now() - self.props.startTime });
    }, 1);
  }

  resetTimer() {
    self.props.stopTimerAction({ time: 0, isOn: false });
    clearInterval(self.timer)
  }

  render() {
    let start = (this.props.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.props.time == 0 || !this.props.isOn) ?
      null :
      <button onClick={this.resetTimer}>stop</button>

    return (
      <div data-tid="container">
        <h2>TIME DOCTOR</h2>
        <div onClick={() => openWidget(this.props.time)}>
          Open Widget
        </div>
        <div onClick={() => closeWidget()}>
          Close Widget
        </div>

        <div>
          <h3>timer: {ms(this.props.time)}</h3>
          {start}
          {stop}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOn: state.counter.isOn,
    time: state.counter.time,
    startTime: state.counter.startTime
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  startTimerAction, stopTimerAction
}, dispatch)

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;