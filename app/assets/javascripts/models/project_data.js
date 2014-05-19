Probe.ProjectData = Ember.Object.extend({
  totalStoryPoints: Ember.computed(function() {
    return this.get("project.features").reduce(function(sum, story) {
      return sum + story.get("estimate");
    }, 0);
  })
});
