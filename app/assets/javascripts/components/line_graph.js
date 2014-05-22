Probe.LineGraphComponent = Ember.Component.extend({
  width: 640,
  height: 480,
  margin: 50,

  init: function() {
    this.validateInput();
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

  didInsertElement: function() {
    this._super();
    Ember.run.next(this, function() {
      var width = this.get("width");
      var height = this.get("height");
      var element = d3.select("svg");
      element.attr("width", width).attr("height", height).style("display", "none");
      var graph = element.append("svg:g").attr("class", "graph");
      graph.append("svg:path").attr("class", "main-plot");
      graph.append("svg:line").attr("class", "regression-line");
      graph.append("svg:line").attr("class", "x-axis");
      graph.append("svg:line").attr("class", "y-axis");
      graph.append("svg:g").attr("class", "end-estimate").append("svg:text").attr("class", "end-estimate-text").attr("text-anchor", "middle");
      console.log("INITIALIZED");
      Ember.run.next(this, "updateGraph");
    });
  },

  collateData: function(x, y) {
    var len = Math.min(x.length, y.length);
    var data = [];
    for (var i = 0; i < len; i++) {
      data[i] = {
        x: x[i],
        y: y[i]
      }
    }
    return data;
  },

  updateGraph: Ember.observer("x-data", "y-data", "width", "height", "margin", function() {
    Ember.run.once(this, function() {
      console.log("updating line graph");
      var x = this.get("x-data");
      var y = this.get("y-data");

      var frame = d3.select("svg");
      if (x.length == 0 || y.length == 0) {
        frame.style("display", "none");
        return;
      }
      frame.style("display", "initial");

      var data = this.collateData(x, y);
      var width = this.get("width");
      var height = this.get("height");
      var margin = this.get("margin");

      var b = Probe.Math.covariance(x, y) / Probe.Math.variance(x);
      var a = Probe.Math.mean(y) - b * Probe.Math.mean(x);

      var xMax = Math.max(d3.max(x), -a/b);
      var yMax = Math.max(d3.max(y), a);
      var xMap = d3.scale.linear()
        .domain([0, xMax])
        .range([0 + margin, width - margin]);
      var yMap = d3.scale.linear()
        .domain([0, yMax])
        .range([0 - margin, -height + margin]);

      frame.attr("width", width).attr("height", height);
      var graph = frame.select(".graph").attr("transform", "translate(0," + height + ")");

      var line = d3.svg.line()
        .x(function(d, i) { return xMap(d.x); })
        .y(function(d, i) { return yMap(d.y); });
      graph.select(".main-plot").attr("d", line(data));

      graph.select(".regression-line")
        .attr("x1", xMap(0))
        .attr("y1", yMap(a))
        .attr("x2", xMap(-a/b))
        .attr("y2", yMap(0));

      graph.select(".end-estimate").attr("transform", "translate(" + xMap(-a/b) + ",-30)");
      graph.select(".end-estimate-text").text("" + Math.round(-a/b) + " days");

      // line axes
      graph.select(".x-axis")
        .attr("x1", xMap(0))
        .attr("y1", yMap(0))
        .attr("x2", xMap(xMax))
        .attr("y2", yMap(0));
      graph.select(".y-axis")
        .attr("x1", xMap(0))
        .attr("y1", yMap(0))
        .attr("x2", xMap(0))
        .attr("y2", yMap(yMax));

      // axes labels
      var xLabel = graph.selectAll(".x-label").data(xMap.ticks(5))
        .attr("x", function(d) { return xMap(d); })
      xLabel.enter().append("svg:text")
        .attr("class", "x-label")
        .text(String)
        .attr("x", function(d) { return xMap(d); })
        .attr("y", 0)
        .attr("text-anchor", "middle");
      xLabel.exit().remove();
      var yLabel = graph.selectAll(".y-label").data(yMap.ticks(5))
        .attr("y", function(d) { return yMap(d); });
      yLabel.enter().append("svg:text")
        .attr("class", "y-label")
        .text(String)
        .attr("x", 0)
        .attr("y", function(d) { return yMap(d); })
        .attr("text-anchor", "left")
        .attr("dy", 4);
      yLabel.exit().remove();

      // axes ticks
      var tickLength = 0.01*Math.min(height, width);
      var xTicks = graph.selectAll(".x-ticks").data(xMap.ticks(5))
        .attr("x1", function(d) { return xMap(d); })
        .attr("y1", yMap(0))
        .attr("x2", function(d) { return xMap(d); })
        .attr("y2", yMap(0) + tickLength);
      xTicks.enter().append("svg:line")
        .attr("class", "x-ticks")
        .attr("x1", function(d) { return xMap(d); })
        .attr("y1", yMap(0))
        .attr("x2", function(d) { return xMap(d); })
        .attr("y2", yMap(0) + tickLength);
      xTicks.exit().remove();
      var yTicks = graph.selectAll(".y-ticks").data(yMap.ticks(5))
        .attr("class", "y-ticks")
        .attr("x1", xMap(0) - tickLength)
        .attr("y1", function(d) { return yMap(d); })
        .attr("x2", xMap(0))
        .attr("y2", function(d) { return yMap(d); });
      yTicks.enter().append("svg:line")
        .attr("class", "y-ticks")
        .attr("x1", xMap(0) - tickLength)
        .attr("y1", function(d) { return yMap(d); })
        .attr("x2", xMap(0))
        .attr("y2", function(d) { return yMap(d); });
      yTicks.exit().remove();
    });
  })
});
