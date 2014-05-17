Probe.StoriesController = Ember.ArrayController.extend({
  needs: "project",
  projectController: Ember.computed.alias("controllers.project"),
  projectIdBinding: "controllers.project.projectId",

  project: function() {
    var promise = this.get("projectController").get("model");
  }.property("projectController"),

  init: function() { console.log("Initializing controller"); }
});
