(() => {
  'use strict';

  const
    Redux = require('redux'),
    React = require('react'),  // eslint-disable-line no-unused-vars
    ReactDOM = require('react-dom'),
    counter = require('./reducer').counter,

    Counter = ({ value, onInc, onDec }) => {  // eslint-disable-line no-unused-vars
      return <div>
        <h1>{value}</h1>
        <button onClick={onInc}>+</button>
        <button onClick={onDec}>-</button>
      </div>;
    },

    store = Redux.createStore(counter),

    render = () => {
      ReactDOM.render(
        <Counter
          value={store.getState()}

          onInc={() => {
            store.dispatch({ 'type': 'INC' });
          }}

          onDec={() => {
            store.dispatch({ 'type': 'DEC' });
          }}
        />,
        document.getElementById('root')
      );
    };

  store.subscribe(render);
  render();

})();
