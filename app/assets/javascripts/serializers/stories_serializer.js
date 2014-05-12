//= require ./serializer_helper

Probe.StorySerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    console.log("Searching for stories");
    console.log(requestType);

    if (requestType === "find") {
      newPayload.story =
        Probe.SerializerHelper.permit(payload, [
          "id", "name", "kind", "project_id", "story_type",
          "current_state", "description", "url"
        ]);
    } else {
      var stories = [];
      for (var i = 0; i < payload.length; i++) {
        stories[stories.length] = Probe.SerializerHelper.permit(payload[i], [
          "id", "name", "kind", "project_id", "story_type",
          "current_state", "description", "url"
        ]);
      }
      newPayload.stories = stories;
    }

    console.log(newPayload);
    return this._super(store, type, newPayload, id, requestType);
  }
});
