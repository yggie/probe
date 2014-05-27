/*
 * Sample JSON response:
 *
 * {
 *   "kind": "story",
 *   "name": "AV: LocalSupport",
 *   "project_id": 101010,
 *   "estimate": 3,
 *   "id": 742821,
 *   "story_type": "chore",
 *   "description": "this is my description",
 *   "current_state": "started",
 *   "requested_by_id": 10123,
 *   "owned_by_id": 10122,
 *   "owner_ids": [
 *     10122
 *   ],
 *   "labels": [
 *     {
 *       "kind": "label",
 *       "id": 180512,
 *       "project_id": 101010,
 *       "name": "may or may not be an epic",
 *       "created_at": "2013-01-30T16:49:39Z",
 *       "updated_at": "2014-02-06T15:43:23Z"
 *     }
 *   ],
 *   "created_at": "2013-01-30T16:49:38Z",
 *   "updated_at": "2014-02-06T15:43:23Z",
 *   "accepted_at": "2014-02-06T15:43:23Z",
 *   "url": "http://www.pivotaltracker.com/story/show/101010"
 * }
 *
 */
//= require ./pivotal_record

Probe.Story = Probe.PivotalRecord.extend({
  name: DS.attr("string"),
  projectId: DS.attr("number"),
  storyType: DS.attr("string"),
  description: DS.attr("string"),
  acceptedAt: DS.attr("date"),
  estimate: DS.attr("number", { defaultValue: function() { return 0; }}),
  // currentState: DS.attr("string"),
  url: DS.attr("string"),

  // owners: DS.hasMany("owner", { async: false }),
  labels: DS.hasMany("label", { async: false }),
  project: Ember.computed("projectId", function() {
    return this.store.find("project", this.get("projectId"));
  })
});
