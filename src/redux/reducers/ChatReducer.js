const ADD_MESSAGE = 'chat/ADD_MESSAGE';
const SET_MESSAGES = 'chat/SET_MESSAGES';

const ChatInitialState = {
  messages: []
}

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages
})

export const ChatReducer = (state = ChatInitialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }
    default:
      return state;
  }
}
