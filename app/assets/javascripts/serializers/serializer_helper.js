Probe.SerializerHelper = {
  camelize: function(string) {
    return string.replace(/[\-_][a-z]/g, function(chars) {
      return chars.replace(/[\-_]/g, "").toUpperCase();
    });
  },
  permit: function(payload, attrs) {
    var obj = {};
    for (var i = 0; i < attrs.length; i++) {
      if (payload[attrs[i]] !== undefined) {
        obj[Probe.SerializerHelper.camelize(attrs[i])] = payload[attrs[i]];
        // console.log(Probe.SerializerHelper.camelize(attrs[i]));
      }
    }
    // console.log("NEW");
    // console.log(payload);
    // console.log(obj);
    // window.obj = obj;
    return obj;
  }
};
