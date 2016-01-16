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

    return state;
  };

  return todos;

})();
