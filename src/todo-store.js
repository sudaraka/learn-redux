module.exports = (() => {
  'use strict';

  const todos = (state, action) => {
    state = state || [];

    if('ADD_TODO' === action.type) {
      return [
        ...state,
        {
          'id': action.id,
          'text': action.text,
          'completed': false
        }
      ];
    }
    else if('TOGGLE_TODO' === action.type) {
      return state.map((todo) => {
        if(action.id !== todo.id) {
          return todo;
        }

        return Object.assign({}, todo, { 'completed': !todo.completed });
      });
    }

    return state;
  };

  return todos;

})();
