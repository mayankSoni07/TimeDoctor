export const START_TIMER_ACTION = "START_TIMER_ACTION";
export const STOP_TIMER_ACTION = "STOP_TIMER_ACTION";
export const IS_OPEN_CLOSE_WIDGET_ACTION = "IS_OPEN_CLOSE_WIDGET_ACTION";
export const CHANGE_TOTAL_TIME_ACTION = "CHANGE_TOTAL_TIME_ACTION";

/** Action to start timer. */
export const startTimerAction = (param) => {
  return {
    type: START_TIMER_ACTION,
    payload: { ...param }
  };
}

/** Action to stop timer. */
export const stopTimerAction = (param) => {
  return (dispatch, getState) => {
    let totalTime = getState().counter.totalTime + getState().counter.time;
    localStorage.setItem("totalTime", totalTime);
    dispatch({
      type: STOP_TIMER_ACTION,
      payload: { ...param, totalTime: totalTime }
    });
  }
}

/** Action for key is widget open or close */
export const isOpenClosedWidgetAction = (param) => {
  return {
    type: IS_OPEN_CLOSE_WIDGET_ACTION,
    payload: { ...param }
  };
}

/** Action to change total time of user. */
export const changeTotalTimeAction = (param) => {
  return {
    type: CHANGE_TOTAL_TIME_ACTION,
    payload: { ...param }
  };
}