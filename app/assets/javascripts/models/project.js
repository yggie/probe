/*
 * Sample JSON response:
 *
 * {
 *   "current_iteration_number": 16,
 *   "enable_planned_mode": false,
 *   "kind": "project",
 *   "created_at": "2013-01-30T16:49:38Z",
 *   "time_zone": {
 *     "kind": "time_zone",
 *     "offset": "+01:00",
 *     "olson_name": "Europe/London"
 *   },
 *   "velocity_averaged_over": 3,
 *   "point_scale_is_custom": false,
 *   "point_scale": "0,1,2,3",
 *   "iteration_length": 4,
 *   "has_google_domain": false,
 *   "id": 742821,
 *   "initial_velocity": 10,
 *   "name": "AV: LocalSupport",
 *   "public": true,
 *   "bugs_and_chores_are_estimatable": false,
 *   "enable_following": true,
 *   "updated_at": "2014-02-06T15:43:23Z",
 *   "week_start_day": "Monday",
 *   "version": 2046,
 *   "account_id": 8155,
 *   "atom_enabled": true,
 *   "enable_incoming_emails": true,
 *   "start_time": "2013-02-25T00:00:00Z",
 *   "number_of_done_iterations_to_show": 12,
 *   "enable_tasks": true
 * }
 *
 */
//= require ./pivotal_record

Probe.Project = Probe.PivotalRecord.extend({
  name: DS.attr("string"),
  version: DS.attr("number"),
  pointScale: DS.attr("string"),
  pointScaleIsCustom: DS.attr("boolean"),

  iterationLength: DS.attr("number"),
  currentIterationNumber: DS.attr("number"),
  currentIterationsComplete: DS.attr("number"),
  initialVelocity: DS.attr("number"),
  weekStartOfDay: DS.attr("string"),

  stories: Ember.computed(function() {
    return this.store.find("story", { projectId: this.get("id") });
  }),

  iterations: Ember.computed(function() {
    return this.store.find("iteration", { projectId: this.get("id") });
  }),

  features: Ember.computed("stories.@each", function() {
    return this.get("stories").filterBy("storyType", "feature");
  }),

  estimated: Ember.computed("features.@each", function() {
    var estimated = [];
    this.get("features").forEach(function(feature, i, features) {
      var estimate = feature.get("estimate");
      if (estimate != null) {
        estimated.push(feature);
      }
    });
    return estimated;
  }),

  data: Ember.computed(function() {
    window.data = Probe.ProjectData.create({ project: this });
    return window.data;
  })
});
