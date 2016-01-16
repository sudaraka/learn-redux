(() => {
  'use strict';

  const
    Redux = require('redux'),
    todoApp = require('./todo-store'),

    store = Redux.createStore(todoApp),

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

  console.log('Dispatching SET_VISIBILITY_FILTER');
  store.dispatch({
    'type': 'SET_VISIBILITY_FILTER',
    'filter': 'SHOW_COMPLETED'
  });
  showState();

})();
