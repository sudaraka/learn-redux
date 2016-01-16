module.exports = (() => {
  'use strict';

  const
    todo_action = (state, action) => {
      if('ADD_TODO' === action.type) {
        return {
          'id': action.id,
          'text': action.text,
          'completed': false
        };
      }
      else if('TOGGLE_TODO' === action.type) {
        if(action.id !== state.id) {
          return state;
        }

        return Object.assign({}, state, { 'completed': !state.completed });
      }

      return state;
    },

    todos = (state, action) => {
      state = state || [];

      if('ADD_TODO' === action.type) {
        return [
          ...state,
          todo_action(null, action)
        ];
      }
      else if('TOGGLE_TODO' === action.type) {
        return state.map((todo) => todo_action(todo, action));
      }

      return state;
    };

  return todos;

})();
