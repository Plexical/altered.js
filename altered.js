;(function(module, global) {
  var modify = function(orig, key, change) {
    var saved = orig[key];
    if(change == undefined)
      delete orig[key];
    else
      orig[key] = change;

    return saved;
  }

  var change = function(orig, changes) {
    var saved = {};
    for(var key in changes)
      saved[key] = modify(orig, key, changes[key]);

    return function() {
      for(var key in saved) modify(orig, key, saved[key]);
    };
  }

  var state = function(orig, changes, run) {
    var restore = change(orig, changes);

    try {
      run()
    } finally {
      restore();
    }

    return orig;
  }

  module.exports = {
    state: state, change: change
  }
})(module, global);
