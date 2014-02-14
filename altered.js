;(function(module, global) {
  var state = function(orig, changes, run) {
    var saved = {};

    for(var key in changes) {
      saved[key] = orig[key];
      if(changes[key] == undefined)
        delete orig[key];
      else
        orig[key] = changes[key];
    }

    try {
      run()
    } finally {
      for(var key in changes) {
        if(saved[key] == undefined)
          delete orig[key];
        else
          orig[key] = saved[key];
      }
    }

    return orig;
  }

  module.exports = {
    state: state
  }
})(module, global);
