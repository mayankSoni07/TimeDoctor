// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const ipcMain = require('electron').remote.ipcMain;
const ms = require('pretty-ms')

import { styles } from './Home.styles';

import { openWidget, closeWidget, sendTime } from './Widget/Widget.jsx';
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
      sendTime(Date.now() - self.props.startTime, self.props.isOn);
      self.props.startTimerAction({ time: Date.now() - self.props.startTime });
    }, 1);
  }

  resetTimer() {
    self.props.stopTimerAction({ start: 0, time: 0, isOn: false });
    clearInterval(self.timer)
  }

  render() {
    let start = (this.props.time == 0) ?
      (this.props.isOn ?
        <img style={styles.playStopImg} src={require('../../internals/img/play_green.png')} onClick={this.startTimer} />
        : <img style={styles.playStopImg} src={require('../../internals/img/play_blue.png')} onClick={this.startTimer} />
      ) : null
    let stop = (this.props.time == 0 || !this.props.isOn) ?
      null :
      (this.props.isOn ?
        <img style={styles.playStopImg} src={require('../../internals/img/stop_green.png')} onClick={this.resetTimer} />
        : <img style={styles.playStopImg} src={require('../../internals/img/stop_blue.png')} onClick={this.resetTimer} />
      )
    let currentTime = new Date().toTimeString();

    return (
      <div style={styles.container}>
        <div style={this.props.isOn ? styles.greenHeader : styles.blueHeader} >
          <label style={styles.headerLabel}><h3>TIME DOCTOR</h3></label>
        </div>

        <div style={styles.bodyData}>
          {!this.props.isOpenClosedWidget &&
            <div onClick={() => {
              self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: true })
              openWidget(this.props.time, this.props.isOn)
            }} style={styles.widgetDiv}
            ><img style={styles.openWidgetImg} src={require('../../internals/img/open_widget.png')} />
              <label style={styles.widgetLabel}>Open Widget</label>
            </div>}

          {this.props.isOpenClosedWidget &&
            <div onClick={() => {
              self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: false })
              closeWidget()
            }} style={styles.widgetDiv}
            ><img style={styles.closeWidgetImg} src={require('../../internals/img/close_widget.png')} />
              <label style={styles.widgetLabel}>Close Widget</label>
            </div>}

          <div style={styles.timerDiv}>
            <div><h3>Timer: {ms(this.props.time)}</h3></div>
            {start}
            {stop}
          </div>
        </div>

        <div style={styles.workedDetail}>
          <div>Worked Today : {ms(this.props.totalTime)}</div>
          <div>Company Time : {currentTime}</div>
        </div>

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