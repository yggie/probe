//= require ./pivotal_tracker_adapter

Probe.StoryAdapter = Probe.PivotalTrackerAdapter.extend({
  findQuery: function(store, type, params, array) {
    console.log(params);
    var url = [ this.get("host"), this.get("namespace"), "projects",
      params.projectId, "stories" ].join("/");
    return Ember.$.getJSON(url).then(function(json) {
      console.log("Got something!");
      return json;
    }, function(error) {
      console.log("Bad things happened....");
      return nil;
    });
  }
});
