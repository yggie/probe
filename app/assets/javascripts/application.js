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
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require d3
//= require handlebars
//= require ember.dist
//= require ember-data.dist
//= require_self
//= require probe

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

//= require_tree .
