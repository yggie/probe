Probe.ProjectView = Ember.View.extend({
  dataChanged: function() {
    Ember.run.once(this, "onDataChanged");
  }.observes("controller.project.data.burndown.@each", "controller.project.data.sortedIterationDays.@each").on("init"),

  onDataChanged: function() {
    console.log("on data changed");
    var burn = this.get("controller.project.data.burndown");
    var days = this.get("controller.project.data.sortedIterationDays");
    var p = [];
    if (!burn || !days) return;

    burn.forEach(function(value, i) {
      p[i] = {
        x: days[i],
        y: value
      };
    });

    if (p.length === 0) return;
    window.p = p;
    var points = d3.select(".burndown").selectAll("circle").data(p);
    points.enter().append("circle")
      .style("fill", "steelblue")
      .attr("cx", function(d,i) { return d.x; })
      .attr("cy", function(d,i) { return d.y; })
      .attr("r", function(d,i) { return 10; });
  }
});
