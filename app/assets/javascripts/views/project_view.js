Probe.ProjectView = Ember.View.extend({
  dataChanged: Ember.observer("controller.project.data.burndown.@each", "controller.project.data.sortedIterationDays.@each", function() {
    Ember.run.once(this, "onDataChanged");
  }).on("init"),

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
    var width = 640;
    var height = 480;
    var xRange = Math.max.apply(Math, days);
    var yRange = Math.max.apply(Math, burn);
    var margin = 20;
    var x = d3.scale.linear().domain([0, d3.max(days)]).range([0 + margin, width - margin]);
    var y = d3.scale.linear().domain([0, d3.max(burn)]).range([0 + margin, height - margin]);

    // line plot
    d3.select("svg").attr("width", width).attr("height", height);
    var g = d3.select("svg").append("svg:g").attr("transform", "translate(0, " + height + ")");
    var line = d3.svg.line().x(function(d,i) { return x(d.x); }).y(function(d,i) { return -y(d.y); });
    g.append("svg:path").attr("d", line(p));

    // line axes
    g.append("svg:line")
      .attr("x1", x(0))
      .attr("y1", -y(0))
      .attr("x2", x(d3.max(days)))
      .attr("y2", -y(0));
    g.append("svg:line")
      .attr("x1", x(0))
      .attr("y1", -y(0))
      .attr("x2", x(0))
      .attr("y2", -y(d3.max(burn)));

    // axes ticks
    g.selectAll(".xLabel")
      .data(x.ticks(5))
      .enter().append("svg:text")
      .attr("class", "xLabel")
      .text(String)
      .attr("x", function(d) { return x(d); })
      .attr("y", 0)
      .attr("text-anchor", "middle");
    g.selectAll(".yLabel")
      .data(y.ticks(4))
      .enter().append("svg:text")
      .attr("class", "yLabel")
      .text(String)
      .attr("x", 0)
      .attr("y", function(d) { return -y(d); })
      .attr("text-anchor", "right")
      .attr("dy", 4);

    this.set("chartDisplay", "initial");
  },

  chartDisplay: "none"
});
