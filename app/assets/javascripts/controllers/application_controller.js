Probe.ApplicationController = Ember.Controller.extend({
  needs: "project",
  projectIdBinding: "controllers.project.projectId",

  actions: {
    search: function() {
      this.transitionToRoute("project", this.get("projectId"));
    }
  }
});
