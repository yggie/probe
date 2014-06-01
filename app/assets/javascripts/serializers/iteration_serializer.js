//= require ./serializer_helper

Probe.IterationSerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    console.log("Serializer: " + type + "." + requestType + "()");

    if (requestType === "find") {
      newPayload.iteration =
        Probe.SerializerHelper.permit(payload, [
          "kind", "project_id", "team_strength", "start", "finish",
          "number"
        ]);
    } else {
      var iterations = [];
      for (var i = 0; i < payload.length; i++) {
        iterations[iterations.length] = Probe.SerializerHelper.permit(payload[i], [
          "kind", "project_id", "team_strength", "start", "finish",
          "number"
        ]);
        // if (stories[stories.length - 1].labels.length == 0) {
        //   delete stories[stories.length - 1].labels;
        // }
      }
      newPayload.iterations = iterations;
    }

    // console.log(newPayload);
    return this._super(store, type, newPayload, id, requestType);
  }
});
