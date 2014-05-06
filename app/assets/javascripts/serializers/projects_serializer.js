//= require ./serializer_helper

Probe.ProjectSerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    if (requestType === "findAll") {
    } else {
      newPayload.project =
        Probe.SerializerHelper.permit(payload, [
          "id", "name", "kind", "version", "point_scale",
          "point_scale_is_custom", "iteration_length",
          "current_iteration_number",
          "number_of_done_iterations_to_show",
          "initial_velocity"
        ]);
    }
    return this._super(store, type, newPayload, id, requestType);
  }
});
