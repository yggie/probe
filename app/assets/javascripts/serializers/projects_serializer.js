Probe.ProjectSerializer = DS.RESTSerializer.extend({
  extract: function(store, type, payload, id, requestType) {
    var newPayload = {};
    if (requestType === 'findAll') {
    } else {
      newPayload.project = {
        id: payload.id,
        name: payload.name,
        kind: payload.kind,
        version: payload.version,
        pointScale: payload.point_scale,
        customPointScale: payload.point_scale_is_custom,
        iterationLength: payload.iteration_length,
        currentIteration: payload.current_iteration_number,
        iterationsComplete: payload.number_of_done_iterations_to_show,
        initialVelocity: payload.initial_velocity
      }
    }
    return this._super(store, type, newPayload, id, requestType);
  }
});
