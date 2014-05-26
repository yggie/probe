// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery-2.1.1
//= require turbolinks
//= require d3-3.4.6
//= require handlebars-1.3.0
//= require ember-1.5.1
//= require ember-data-1.0.0-beta.6
//= require_self
//= require probe
//= require_tree .

// for more details see: http://emberjs.com/guides/application/
Probe = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

Ember.Object.reopen({
  throwException: function(msg) {
    throw this.toString() + " " + msg;
  }
});

// Ember.TextSupport.reopen({
//   attributeBindings: ["somethin"]
// });
// Probe.IndexView = Ember.View.extend({
//   templateName: "layouts/welcome"
// });
