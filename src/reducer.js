module.exports = (() => {
  'use strict';

  return {

    'counter': (state, action) => {

      if('undefined' === typeof state) {
        return 0;
      }

      if('INC' === action.type) {
        return state + 1;
      }
      else if('DEC' === action.type) {
        return state - 1;
      }
      else {
        return state;
      }

    }

  };

})();
