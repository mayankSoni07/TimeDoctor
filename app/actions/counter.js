export const START_TIMER_ACTION = "START_TIMER_ACTION";
export const STOP_TIMER_ACTION = "STOP_TIMER_ACTION";
export const IS_OPEN_CLOSE_WIDGET_ACTION = "IS_OPEN_CLOSE_WIDGET_ACTION";

export const startTimerAction = (param) => {
  return {
    type: START_TIMER_ACTION,
    payload: { ...param }
  };
}

export const stopTimerAction = (param) => {
  return {
    type: STOP_TIMER_ACTION,
    payload: { ...param }
  };
}

export const isOpenClosedWidgetAction = (param) => {
  return {
    type: IS_OPEN_CLOSE_WIDGET_ACTION,
    payload: { ...param }
  };
}