var extend = require( 'extend' );
var dispatcher = require( 'dispatchy' );

module.exports = function ( obj, keys ) {
  keys = keys || [];

  var observable = extend( Object.create( obj ), dispatcher );

  keys.forEach( function ( key ) {
    var currentValue = observable[ key ];

    Object.defineProperty( observable, key, {
      set: function ( val ) {
        var oldValue = currentValue;
        if ( oldValue !== val ) {

          var me = this;

          var args = {
            key: key,
            oldValue: oldValue,
            newValue: val
          };

          currentValue = val;

          me.fire( 'change:' + key, args );
          me.fire( 'change', args );
        }
      },
      get: function () {
        return currentValue;
      }
    } );
  } );

  return observable;
};
