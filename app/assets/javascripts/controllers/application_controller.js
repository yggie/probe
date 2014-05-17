Probe.ApplicationController = Ember.Controller.extend({
  projectId: null,

  actions: {
    searchProject: function() {
      this.transitionToRoute("project", this.get("projectId"));
    }
  }
});
