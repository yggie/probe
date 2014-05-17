Probe.StoriesRoute = Ember.Route.extend({
  setupController: function(controller, stories) {
    this._super(controller, stories);
    if (!stories) {
      // do something bad here
      console.log("Something bad happened (no stories found)");
    }
  },

  model: function(params) {
    return this.store.find("story", { projectId: this.modelFor("project").id });
  }
});
