function Widget () {
  return {
    go: function () {}
  }
}

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

  },

  require: {
    './widget': Widget
  }
}
