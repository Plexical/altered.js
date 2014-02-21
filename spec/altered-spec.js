var altered = require('./../altered');

var state = altered.state,
    change = altered.change,
    should = require('should');

describe("The state() function", function() {
  it("temporary adds new properties", function() {
    var ob = {a: 1};
    state(ob, {b: 2}, function() {
      ob.a.should.be.exactly(1);
      ob.b.should.be.exactly(2);
    });
    ob.should.eql({a:1});
  });
  it("temporary overwrites properties", function() {
    var ob = {a: 1};
    state(ob, {a: 2}, function() {
      ob.a.should.be.exactly(2);
    });
    ob.a.should.be.exactly(1);
  });
  it("can 'forget' undefined properties", function() {
    var ob = {a: 1, b: 2};
    state(ob, {b: undefined}, function() {
      ob.should.eql({a: 1});
    });
    ob.should.eql({a: 1, b: 2});
  });
  it("restores correctly even if callback throws", function() {
    var ob = {a: 1};
    try {
      state(ob, {a: 2}, function() {
        ob.should.eql({a: 2});
        throw 'Ops!'
      });
    } catch(e) {
      // <- NB exception still thrown and propagates
      ob.should.eql({a: 1});
    }
  });
});

describe("two step alteration", function() {
  var ob = null;

  beforeEach(function() {
    ob = {a: 1};
  });

  it("temporary adds new properties", function() {
    var restore = change(ob, {b: 2});
    ob.should.eql({a: 1, b: 2});
    restore();
    ob.should.eql({a: 1});
  });
  it("temporary overwrites properties", function() {
    var restore = change(ob, {a: 2});
    ob.should.eql({a: 2});
    restore();
    ob.should.eql({a: 1});
  });
  it("can 'forget' undefined properties", function() {
    var o2 = {a: 1, b: 2};
    var restore = change(o2, {b: undefined});
    o2.should.eql({a: 1});
    restore();
    o2.should.eql({a: 1, b: 2});
  });
});
