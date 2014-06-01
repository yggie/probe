//= require ./serializer_helper

Probe.StorySerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    console.log("Serializer: " + type + "." + requestType + "()");

    if (requestType === "find") {
      newPayload.story =
        Probe.SerializerHelper.permit(payload, [
          "id", "name", "kind", "project_id", "story_type", "updated_at",
          "current_state", "description", "url", "accepted_at", "created_at",
          "estimate"
        ]);
    } else {
      var stories = [];
      for (var i = 0; i < payload.length; i++) {
        stories[stories.length] = Probe.SerializerHelper.permit(payload[i], [
          "id", "name", "kind", "project_id", "story_type", "updated_at",
          "current_state", "description", "url", "accepted_at", "created_at",
          "estimate"
        ]);
        // if (stories[stories.length - 1].labels.length == 0) {
        //   delete stories[stories.length - 1].labels;
        // }
      }
      newPayload.stories = stories;
    }

    // console.log(newPayload);
    return this._super(store, type, newPayload, id, requestType);
  }
});
