(() => {
  'use strict';

  const
    Redux = require('redux'),
    counter = require('./reducer').counter,
    store = Redux.createStore(counter),

    render = () => {
      console.log(store.getState());
    };

  store.subscribe(render);
  render();

  store.dispatch({ 'type': 'INC'});
  store.dispatch({ 'type': 'INC'});
  store.dispatch({ 'type': 'DEC'});
  store.dispatch({ 'type': 'DEC'});
  store.dispatch({ 'type': 'INC'});
  store.dispatch({ 'type': 'INC'});

})();
