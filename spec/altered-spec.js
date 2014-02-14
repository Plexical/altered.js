var state = require('./../altered').state,
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
