Probe.StoriesController = Ember.ArrayController.extend({
  needs: "project",
  projectController: Ember.computed.alias("controllers.project"),
  projectIdBinding: "controllers.project.projectId",

  project: function() {
    return this.get("projectController").get("model");
  }.property("projectController")
});
