Probe.ProjectRoute = Ember.Route.extend({
  projectId: null,

  model: function(params) {
    var route = this;
    return this.store.find('project', params.project_id)
      .then(function(json) {
        route.set('projectId', params.project_id);
        return json;
      }, function(reason) {
        return reason;
      });
  },

  actions: {
    search: function() {
      console.log(arguments);
      this.transitionTo('project', projectId);
    }
  }
});
