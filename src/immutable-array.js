module.exports = (() => {
  'use strict';

  return {

    'addCounter': (list) => {
      return [...list, 0];
    },

    'removeCounter': (list, index) => {
      return [...list.slice(0, index), ...list.slice(index + 1)];
    },

    'incCounter': (list, index) => {
      return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
      ];
    }

  };

})();
