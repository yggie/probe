// For more information see: http://emberjs.com/guides/routing/

Probe.Router.map(function() {
  this.resource('project', { path: '/project/:project_id' });
});
