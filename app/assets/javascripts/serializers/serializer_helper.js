Probe.SerializerHelper = {
  permit: function(payload, attrs) {
    var obj = {};
    for (var i = 0; i < attrs.length; i++) {
      obj[attrs[i]] = payload[attrs[i]];
    }
    return obj;
  }
};
