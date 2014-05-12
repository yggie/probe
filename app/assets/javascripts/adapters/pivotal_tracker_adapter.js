Probe.PivotalTrackerAdapter = DS.ActiveModelAdapter.extend({
  host: "https://www.pivotaltracker.com",
  namespace: "services/v5",

  find: function(store, type, id) {
    console.log("Adapter: " + type + ".find()");
    return this._super(store, type, id);
  },

  findMany: function(store, type, ids) {
    console.log("Adapter: " + type + ".findMany()");
    return this._super(store, type, ids);
  },

  findQuery: function(store, type, params, array) {
    console.log("Adapter: " + type + ".findQuery()");
    return this._super(store, type, params, array);
  }
});
