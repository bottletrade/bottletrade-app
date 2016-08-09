(function() {
  'use strict';

angular.module('bottletrade.firebase.utils', ['firebase'])

// a simple utility to create references to Firebase paths
    .factory('firebaseRef', function() {
        /**
         * @function
         * @name firebaseRef
         * @param {String|Array...} path
         * @return a Firebase instance
         */
        return function(path) {
            var ref = firebase.database().ref();
            if( arguments.length ) {
               ref = ref.child(pathRef([].concat(Array.prototype.slice.call(arguments))));
            }
            return ref;
        };
    });

  function pathRef(args) {
    for(var i=0; i < args.length; i++) {
        if( args[i] && angular.isArray(args[i]) ) {
            args[i] = pathRef(args[i]);
        }
    }
    return args.join('/');
  }
})();
