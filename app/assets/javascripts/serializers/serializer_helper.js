Probe.SerializerHelper = {
  camelize: function(string) {
    return string.replace(/[\-_][a-z]/g, function(chars) {
      return chars.replace(/[\-_]/g, "").toUpperCase();
    });
  },
  permit: function(payload, attrs) {
    var obj = {};
    for (var i = 0; i < attrs.length; i++) {
      obj[Probe.SerializerHelper.camelize(attrs[i])] = payload[attrs[i]];
    }
    return obj;
  }
};
