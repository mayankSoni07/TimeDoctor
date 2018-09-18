// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ipcMain = require('electron').remote.ipcMain;
import styles from './Home.css';
import { openWidget, closeWidget, sendTime } from './Widget/Widget.jsx';
const ms = require('pretty-ms')
import {
  startTimerAction, stopTimerAction, isOpenClosedWidgetAction, changeTotalTimeAction
} from '../actions/counter';

let self;

class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    ipcMain.on('startTimer', () => {
      self.startTimer();
    })
    ipcMain.on('stopTimer', () => {
      self.resetTimer();
    })
    ipcMain.on('closeWidget', () => {
      self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: false })
      closeWidget()
    })
  }

  componentWillMount() {
    let totalTime = localStorage.getItem("totalTime");
    if (totalTime)
      self.props.changeTotalTimeAction({ "totalTime": parseInt(totalTime) });
  }

  startTimer() {
    self.props.startTimerAction({ isOn: true, time: 0, startTime: Date.now() });
    self.timer = setInterval(() => {
      sendTime(Date.now() - self.props.startTime);
      self.props.startTimerAction({ time: Date.now() - self.props.startTime });
    }, 1);
  }

  resetTimer() {
    self.props.stopTimerAction({ start: 0, time: 0, isOn: false });
    clearInterval(self.timer)
  }

  render() {
    let start = (this.props.time == 0) ?
      <button onClick={this.startTimer}>START TIMER</button> :
      null
    let stop = (this.props.time == 0 || !this.props.isOn) ?
      null :
      <button onClick={this.resetTimer}>STOP TIMER</button>
    let currentTime = new Date().toTimeString();

    return (
      <div data-tid="container">
        <h2>TIME DOCTOR</h2>

        {this.props.isOn ?
          <label style={{ color: 'green' }}>GREEN</label> :
          <label style={{ color: 'blue' }}>BLUE</label>
        }

        {!this.props.isOpenClosedWidget && <div onClick={() => {
          self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: true })
          openWidget(this.props.time)
        }}>Open Widget</div>}

        {this.props.isOpenClosedWidget && <div onClick={() => {
          self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: false })
          closeWidget()
        }}>Close Widget</div>}

        <div>
          <h3>timer: {ms(this.props.time)}</h3>
          {start}
          {stop}
        </div>

        <div>Worked Today : {ms(this.props.totalTime)}</div>
        <div>Company Time : {currentTime}</div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOn: state.counter.isOn,
    time: state.counter.time,
    startTime: state.counter.startTime,
    isOpenClosedWidget: state.counter.isOpenClosedWidget,
    totalTime: state.counter.totalTime
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  startTimerAction, stopTimerAction, isOpenClosedWidgetAction, changeTotalTimeAction
}, dispatch)

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;