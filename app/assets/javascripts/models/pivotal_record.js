Probe.PivotalRecord = DS.Model.extend({
  kind: DS.attr("string"),
  name: DS.attr("string"),
  createdAt: DS.attr("date"),
  updatedAt: DS.attr("date")
});
