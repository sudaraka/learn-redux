(() => {
  'use strict';

  const
    counter = require('./reducer').counter,

    createStore = (reducer) => {
      let
        state,
        listeners = [];

      const
        getState = () => state,

        dispatch = (action) => {
          state = reducer(state, action);

          listeners.forEach((listener) => listener());
        },

        subscribe = (listener) => {
          listeners.push(listener);

          return () => {
            listeners = listeners.filter((remove_listener) => remove_listener !== listener);
          };
        };

      dispatch({});

      return { getState, dispatch, subscribe };
    },

    store = createStore(counter),

    render = () => {
      document.body.textContent = store.getState();
    };

  store.subscribe(render);
  render();

  document.addEventListener('click', () => {
    store.dispatch({ 'type': 'INC' });
  });

})();
