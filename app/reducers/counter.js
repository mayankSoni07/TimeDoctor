// @flow
import { START_TIMER_ACTION, STOP_TIMER_ACTION } from '../actions/counter';

const initial = {
  isOn: false, time: 0, startTime: 0
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
    default:
      return state;
  }
}
