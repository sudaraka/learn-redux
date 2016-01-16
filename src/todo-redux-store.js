(() => {
  'use strict';

  const
    Redux = require('redux'),
    todos = require('./todo-store'),

    store = Redux.createStore(todos),

    showState = () => {
      console.log(`Store state:\n ${JSON.stringify(store.getState(), null, 2)}\n${'-'.repeat(35)}\n`);
    };

  showState();

  console.log('Dispatching ADD_TODO');
  store.dispatch({
    'type': 'ADD_TODO',
    'id': 0,
    'text': 'Learn Redux'
  });
  showState();

  console.log('Dispatching ADD_TODO');
  store.dispatch({
    'type': 'ADD_TODO',
    'id': 1,
    'text': 'Go Shopping'
  });
  showState();

  console.log('Dispatching TOGGLE_TODO');
  store.dispatch({
    'type': 'TOGGLE_TODO',
    'id': 1
  });
  showState();

})();
