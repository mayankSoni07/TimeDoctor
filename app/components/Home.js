import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/** import ipcMain to listen events for start or stop timer. */
const ipcMain = require('electron').remote.ipcMain;
/** Used to show time in seconds. */
const ms = require('pretty-ms')

/** Methods to open, close and send time to widget. */
import { openWidget, closeWidget, sendTime } from './Widget/Widget.jsx';
/** Some actions for controlling data */
import {
  startTimerAction, stopTimerAction, isOpenClosedWidgetAction, changeTotalTimeAction
} from '../actions/counter';
import { styles } from './Home.styles';

let self;

class Home extends Component {
  constructor(props) {
    super(props);
    self = this;
    /** Event listners from widget to start, stop timer and close widget. */
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
    /** Fetch totalTime from localstorage. */
    let totalTime = localStorage.getItem("totalTime");
    if (totalTime)
      self.props.changeTotalTimeAction({ "totalTime": parseInt(totalTime) });
  }

  /** Used to Start timer. */
  startTimer() {
    /** Dispatch action to start timer. */
    self.props.startTimerAction({ isOn: true, time: 0, startTime: Date.now() });
    /** Set time interval to start timer. */
    self.timer = setInterval(() => {
      sendTime(Date.now() - self.props.startTime, self.props.isOn);
      self.props.startTimerAction({ time: Date.now() - self.props.startTime });
    }, 1);
  }

  /** Used to Stop timer. */
  resetTimer() {
    /** Dispatch action to stop timer. */
    self.props.stopTimerAction({ start: 0, time: 0, isOn: false });
    /** Clear time interval to stop timer. */
    clearInterval(self.timer)
  }

  render() {
    /** Start button blue/green on conditions. */
    let start = (this.props.time == 0) ?
      (this.props.isOn ?
        <img style={styles.playStopImg} src={require('../../internals/img/play_green.png')} onClick={this.startTimer} />
        : <img style={styles.playStopImg} src={require('../../internals/img/play_blue.png')} onClick={this.startTimer} />
      ) : null
    /** Stop button blue/green on conditions. */
    let stop = (this.props.time == 0 || !this.props.isOn) ?
      null :
      (this.props.isOn ?
        <img style={styles.playStopImg} src={require('../../internals/img/stop_green.png')} onClick={this.resetTimer} />
        : <img style={styles.playStopImg} src={require('../../internals/img/stop_blue.png')} onClick={this.resetTimer} />
      )
    /** Current Time to display. */
    let currentTime = new Date().toTimeString();

    return (
      <div style={styles.container}>
        {/* Header */}
        <div style={this.props.isOn ? styles.greenHeader : styles.blueHeader} >
          <label style={styles.headerLabel}><h3>TIME DOCTOR</h3></label>
        </div>

        {/* Main Body */}
        <div style={styles.bodyData}>
          {/* Open Widget Button */}
          {!this.props.isOpenClosedWidget &&
            <div onClick={() => {
              self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: true })
              openWidget(this.props.time, this.props.isOn)
            }} style={styles.widgetDiv}
            ><img style={styles.openWidgetImg} src={require('../../internals/img/open_widget.png')} />
              <label style={styles.widgetLabel}>Open Widget</label>
            </div>}

          {/* Close Widget Button */}
          {this.props.isOpenClosedWidget &&
            <div onClick={() => {
              self.props.isOpenClosedWidgetAction({ isOpenClosedWidget: false })
              closeWidget()
            }} style={styles.widgetDiv}
            ><img style={styles.closeWidgetImg} src={require('../../internals/img/close_widget.png')} />
              <label style={styles.widgetLabel}>Close Widget</label>
            </div>}

          {/* Display Timer */}
          <div style={styles.timerDiv}>
            <div><h3>Timer: {ms(this.props.time)}</h3></div>
            {start}
            {stop}
          </div>
        </div>

        {/* Worked Detail */}
        <div style={styles.workedDetail}>
          <div>Worked Today : {ms(this.props.totalTime)}</div>
          <div>Company Time : {currentTime}</div>
        </div>

      </div>
    );
  }
}

/** Return object to map state into props. */
const mapStateToProps = state => {
  return {
    isOn: state.counter.isOn,
    time: state.counter.time,
    startTime: state.counter.startTime,
    isOpenClosedWidget: state.counter.isOpenClosedWidget,
    totalTime: state.counter.totalTime
  }
}
/** Return action creator with functions to map dispatch into props. */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  startTimerAction, stopTimerAction, isOpenClosedWidgetAction, changeTotalTimeAction
}, dispatch)
/** Connect state and functions with Component. */
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;