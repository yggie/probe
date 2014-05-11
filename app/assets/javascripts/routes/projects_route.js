Probe.ProjectRoute = Ember.Route.extend({
  setupController: function(controller, project) {
    if (project) {
      this._super(controller, project)
      controller.set("projectId", project.get("id"));
    } else {
      controller.transitionToRoute("index");
    }
  },

  model: function(params) {
    return this.store.find("project", params.project_id);
  }
});
