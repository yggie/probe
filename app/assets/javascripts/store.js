// http://emberjs.com/guides/models/using-the-store/

Probe.Store = DS.Store.extend({
  adapter: 'Probe.ApplicationAdapter'
});

Probe.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://www.pivotaltracker.com',
  namespace: 'services/v5'
});
