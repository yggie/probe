/*
 * {
 *   kind: "iteration",
 *   number: 3,
 *   project_id: 123123,
 *   team_strength: 3,
 *   start: "2014-01-19T11:11:11",
 *   finish: "2015-02-23T11:22:33",
 *   stories: [
 *     { STORY }
 *   ]
 * }
 */
//= require ./pivotal_record

Probe.Iteration = Probe.PivotalRecord.extend({
  number: DS.attr("number"),
  projectId: DS.attr("number"),
  teamStrength: DS.attr("number"),
  start: DS.attr("date"),
  finish: DS.attr("date"),
  stories: DS.hasMany("story", { async: false })
});
