Probe.LineGraphComponent = Ember.Component.extend({
  width: 640,
  height: 480,
  margin: 20,
  display: "none",

  init: function() {
    this.get("validateInput").call(this);
  },

  validateInput: function() {
    function validateExistence(property, errors) {
      var value = this.get(property);
      if (value == null) {
        errors.push(property + " must be defined!");
      }
    }

    var errors = [];
    validateExistence.call(this, "x-data", errors);
    validateExistence.call(this, "y-data", errors);

    if (errors.length > 0) {
      this.throwException("\n" + errors.join("\n"));
    }
  },

  dataChangeObserver: Ember.observer("x-data", "y-data", function() {
    Ember.run.once(this, "onDataChanged");
  }).on("init"),

  onDataChanged: function() {
    console.log("updating line graph");
    var x = this.get("x-data");
    var y = this.get("y-data");

    if (x.length == 0 || y.length == 0) return;
    this.set("display", "initial");

    var len = Math.min(x.length, y.length);
    var data = [];
    for (var i = 0; i < len; i++) {
      data[i] = {
        x: x[i],
        y: y[i]
      }
    }

    var width = this.get("width");
    var height = this.get("height");
    var margin = this.get("margin");

    var xMap = d3.scale.linear()
      .domain([0, d3.max(x)])
      .range([0 + margin, width - margin]);
    var yMap = d3.scale.linear()
      .domain([0, d3.max(y)])
      .range([0 - margin, -height + margin]);

    d3.select("svg").attr("width", width).attr("height", height);
    var g = d3.select("svg").append("svg:g")
      .attr("transform", "translate(0, " + height + ")");

    var line = d3.svg.line()
      .x(function(d,i) { return xMap(d.x); })
      .y(function(d,i) { return yMap(d.y); });
    g.append("svg:path").attr("d", line(data));

    // line axes
    g.append("svg:line")
      .attr("x1", xMap(0))
      .attr("y1", yMap(0))
      .attr("x2", xMap(d3.max(x)))
      .attr("y2", yMap(0));
    g.append("svg:line")
      .attr("x1", xMap(0))
      .attr("y1", yMap(0))
      .attr("x2", xMap(0))
      .attr("y2", yMap(d3.max(y)));

    // axes labels
    g.selectAll(".x-label").data(xMap.ticks(5))
      .enter().append("svg:text")
      .attr("class", "x-label")
      .text(String)
      .attr("x", function(d) { return xMap(d); })
      .attr("y", 0)
      .attr("text-anchor", "middle");
    g.selectAll(".y-label").data(yMap.ticks(4))
      .enter().append("svg:text")
      .attr("class", "y-label")
      .text(String)
      .attr("x", 0)
      .attr("y", function(d) { return yMap(d); })
      .attr("text-anchor", "left")
      .attr("dy", 4);

    // axes ticks
    var tickLength = 0.01*Math.min(height, width);
    g.selectAll(".x-ticks").data(xMap.ticks(5))
      .enter().append("svg:line")
      .attr("class", "x-ticks")
      .attr("x1", function(d) { return xMap(d); })
      .attr("y1", yMap(0))
      .attr("x2", function(d) { return xMap(d); })
      .attr("y2", yMap(0) + tickLength)
    g.selectAll(".y-ticks").data(yMap.ticks(5))
      .enter().append("svg:line")
      .attr("class", "y-ticks")
      .attr("x1", xMap(0) - tickLength)
      .attr("y1", function(d) { return yMap(d); })
      .attr("x2", xMap(0))
      .attr("y2", function(d) { return yMap(d); });
  }
});
