const SET_ALARM_BY_TEACHER = 'SET_ALARM_TEACHER';
const DECREASE_ALARM_BY_TEACHER = 'DECREASE_ALARM_BY_TEACHER';

const AlarmInitialState = {
  alarm_by_teacher: 0
}

export const setAlarmbyTeacher = (alarm_by_teacher) => ({
  type: SET_ALARM_BY_TEACHER,
  alarm_by_teacher
})

export const decreaseAlarmbyTeacher = () => ({
  type: DECREASE_ALARM_BY_TEACHER,
})

export const AlarmReducer = (state = AlarmInitialState, action) => {
  switch(action.type) {
    case SET_ALARM_BY_TEACHER:
      return {
        ...state,
        alarm_by_teacher: action.alarm_by_teacher
      }
    case DECREASE_ALARM_BY_TEACHER:
      return {
        ...state,
        alarm_by_teacher: state.alarm_by_teacher - 1
      }

    default:
      return state;
  }
}
