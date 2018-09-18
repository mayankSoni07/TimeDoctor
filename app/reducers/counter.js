// @flow
import {
  START_TIMER_ACTION, STOP_TIMER_ACTION, IS_OPEN_CLOSE_WIDGET_ACTION, CHANGE_TOTAL_TIME_ACTION
} from '../actions/counter';

const initial = {
  isOn: false, time: 0, startTime: 0, totalTime: 0, isOpenClosedWidget: false
}

export default function counter(state = initial, action) {
  switch (action.type) {
    case START_TIMER_ACTION:
      return {
        ...state,
        ...action.payload
      };
    case STOP_TIMER_ACTION:
      return {
        ...state,
        ...action.payload
      };
    case IS_OPEN_CLOSE_WIDGET_ACTION:
      return {
        ...state,
        ...action.payload
      }
    case CHANGE_TOTAL_TIME_ACTION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
