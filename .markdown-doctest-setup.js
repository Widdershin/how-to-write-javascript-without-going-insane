module.exports = {
  globals: {
    window: {},

    $: function () {
      return {
        on: function (eventName, cb) {
          var event = {preventDefault: function () {}};
          cb.bind(event, event);
        }
      }
    }
  }
}
