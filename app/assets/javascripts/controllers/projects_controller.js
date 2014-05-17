Probe.ProjectController = Ember.ObjectController.extend({
  needs: "application",
  projectIdBinding: "controllers.application.projectId",
  project: Ember.computed.alias("model")
});
