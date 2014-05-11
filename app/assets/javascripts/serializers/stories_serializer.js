//= require ./serializer_helper

Probe.StorySerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    console.log("Searching for stories");
    if (requestType === "findAll") {
      newPayload.stories = [];
      for (var i = 0; i < payload.length; i++) {
        newPayload.stories.push(Probe.SerializerHelper.permit(payload[i], [
          "id", "name", "kind", "project_id", "story_type",
          "current_state", "description", "url"
        ]));
      }
    } else {
      newPayload.story =
        Probe.SerializerHelper.permit(payload, [
          "id", "name", "kind", "project_id", "story_type",
          "current_state", "description", "url"
        ]);
    }
  }
});
