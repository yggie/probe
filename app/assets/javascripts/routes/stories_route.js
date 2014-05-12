Probe.StoriesRoute = Ember.Route.extend({
  setupController: function(controller, stories) {
    if (stories) {
      this._super(controller, stories);
    } else {
      // do something bad here
      this._super(controller, stories);
    }
  },

  model: function(params) {
    return this.store.find("story", { projectId: this.modelFor("project").id });
  }
});
