export const START_TIMER_ACTION = "START_TIMER_ACTION";
export const STOP_TIMER_ACTION = "STOP_TIMER_ACTION";

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