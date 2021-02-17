const ADD_MESSAGE = 'chat/ADD_MESSAGE';

const ChatInitialState = {
  messages: []
}

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const ChatReducer = (state = ChatInitialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state;
  }
}
