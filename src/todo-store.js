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
    },

    visibilityFilter = (state, action) => {
      state = state || 'SHOW_ALL';

      if('SET_VISIBILITY_FILTER' === action.type) {
        return action.filter;
      }

      return state;
    },

    todoApp = (state, action) => {
      state = state || {};

      return {
        'todos': todos(state.todos, action),
        'visibilityFilter': visibilityFilter(state.visibilityFilter, action)
      };
    };

  return todoApp;

})();
