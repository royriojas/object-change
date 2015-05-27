describe( 'object-change', function () {
  var objChange = require( '../index' );

  it( 'should fire a `change` event when the observed properties change', function () {
    var me = this;
    var objTest = {
      someProp: 1
    };

    var objProxy = objChange( objTest, [
      'someProp'
    ] );

    var changeSpy = me.sandbox.spy();

    objProxy.on( 'change', changeSpy );

    objProxy.someProp = 2;

    expect( changeSpy ).to.have.been.calledWith( me.sandbox.match( {} ) );

  } );

  it( 'should fire a `change:propertyName` event when an observed property changes', function () {
    var me = this;
    var objTest = {
      someProp: 1,
      someOther: 'some value'
    };

    var objProxy = objChange( objTest, [
      'someProp'
    ] );

    var changeSpy = me.sandbox.spy();

    objProxy.on( 'change:someProp', changeSpy );

    objProxy.someProp = 2;

    expect( changeSpy ).to.have.been.called;

  } );

  it( 'should not fire a `change` event when the observed properties new value is the same as the previous one', function () {
    var me = this;
    var objTest = {
      someProp: 1
    };

    var objProxy = objChange( objTest, [
      'someProp'
    ] );

    var changeSpy = me.sandbox.spy();

    objProxy.on( 'change', changeSpy );

    objProxy.someProp = 1;

    expect( changeSpy ).to.not.have.been.called;

  } );

  it( 'should not fail if no properties to be observed are defined', function () {
    var me = this;
    var objTest = {
      someProp: 1
    };

    var objProxy = objChange( objTest );

    var changeSpy = me.sandbox.spy();

    objProxy.on( 'change', changeSpy );

    objProxy.someProp = 1;

    expect( changeSpy ).to.not.have.been.called;
  } );

  it( 'should retrieve the value after it has changed', function () {
    var objTest = {
      someProp: 1
    };

    var objProxy = objChange( objTest, [
      'someProp'
    ] );

    objProxy.someProp = 2;

    expect( objProxy.someProp ).to.equal( 2 );
    expect( objTest.someProp ).to.equal( 1 );
  } );

} );
