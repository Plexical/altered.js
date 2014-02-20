;(function(module, global) {
  var modify = function(orig, key, change) {
    var saved = orig[key];
    if(change == undefined)
      delete orig[key];
    else
      orig[key] = change;

    return saved;
  }

  var state = function(orig, changes, run) {
    var saved = {};

    for(var key in changes)
      saved[key] = modify(orig, key, changes[key]);

    try {
      run()
    } finally {
      for(var key in changes)
        modify(orig, key, saved[key]);
    }

    return orig;
  }

  module.exports = {
    state: state
  }
})(module, global);
