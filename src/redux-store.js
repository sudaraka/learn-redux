(() => {
  'use strict';

  const
    Redux = require('redux'),
    counter = require('./reducer').counter,
    store = Redux.createStore(counter),

    render = () => {
      document.body.textContent = store.getState();
    };

  store.subscribe(render);
  render();

  document.addEventListener('click', () => {
    store.dispatch({ 'type': 'INC' });
  });

})();
