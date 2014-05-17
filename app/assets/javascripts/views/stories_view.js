Probe.StoriesView = Ember.View.extend({
  templateUrl: "templates/stories",

  didInsertElement: function() {
    console.log("Updating view");
    Ember.run.next(this, function() {
      console.log("After updating view");
      var controller = this.get("controller");
      var stories = controller.get("model");
      console.log(controller);
      window.stories = stories;
      var dates = stories.map(function(story, i, list) {
        return Math.round(Date.parse(story.get("acceptedAt")) / (24 * 3600 * 1000));
      });
      window.dates = dates;

      var minDate = Math.min.apply(Math, dates);
      // var maxDate = Math.max.apply(Math, dates);
      dates = dates.map(function(d) { return d - minDate; });

      var points = d3.select(".burndown").selectAll("circle").data(dates);
      window.chart = points;
      console.log(points);
      points.enter().append("circle")
        .style("fill", "steelblue")
        .attr("cx", function(d, i) { return d; })
        .attr("cy", function(d, i) { return dates.length - i; })
        .attr("r", function(d, i) { return 10; });
    });
  }
});
