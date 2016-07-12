function Widget () {
  return {
    go: function () {}
  }
}

function noop () {}

module.exports = {
  globals: {
    window: {},

    module: {exports: {}},

    Widget,

    $: function () {
      return {
        on: function (eventName, cb) {
          var event = {preventDefault: function () {}};
          cb.bind(event, event);
        }
      }
    },

    objectOrElement: {},

    label: 'test',

    console: {
      log: noop,
      group: noop,
      groupEnd: noop,
      dir: noop,
    }
  },


  require: {
    './widget': Widget
  }
}
