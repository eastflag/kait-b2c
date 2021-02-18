const ADD_MESSAGE = 'chat/ADD_MESSAGE';
const SET_MESSAGES = 'chat/SET_MESSAGES';

const ChatInitialState = {
  total_messages: [] // [{questionId: questionId, messages: [message, message,,,]}, ,,]
}

export const addMessage = ({questionId, message}) => ({
  type: ADD_MESSAGE,
  questionId,
  message
})

export const setMessages = ({questionId, messages}) => ({
  type: SET_MESSAGES,
  questionId,
  messages
})

export const ChatReducer = (state = ChatInitialState, action) => {
  let room;
  switch(action.type) {
    case ADD_MESSAGE:
      room = state.total_messages.find(item => item.questionId === action.questionId);
      if (room) {
        room.messages = [...room.messages, action.message];
      } else {
        state.total_messages.push({questionId: action.questionId, messages: [action.message]});
      }
      return {
        ...state,
        total_messages: [...state.total_messages]
      }
    case SET_MESSAGES:
      room = state.total_messages.find(item => item.questionId === action.questionId);
      if (room) {
        room.messages = action.messages;
      } else {
        state.total_messages.push({questionId: action.questionId, messages: action.messages});
      }
      return {
        ...state,
        total_messages: [...state.total_messages]
      }
    default:
      return state;
  }
}
