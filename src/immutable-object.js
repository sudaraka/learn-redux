module.exports = (() => {
  'use strict';

  return {

    'toggleTodo': (todo) => {
      return Object.assign({}, todo, {
        'completed': !todo.completed
      });
    }

  };

})();
