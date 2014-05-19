Probe.ProjectData = Ember.Object.extend({
  totalStoryPoints: Ember.computed("project.features.@each", function() {
    return this.get("project.features").reduce(function(sum, story) {
      return sum + story.get("estimate");
    }, 0);
  }),

  iterationDays: Ember.computed("project.features.@each", function() {
    var rawNormalizedDays = this.get("project.features").map(function(feature) {
      var date = feature.get("acceptedAt");
      if (!date) return null;

      function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
      }

      function daysUpToMonth(month, year) {
        var days = 0;
        for (var i = 0; i < month; i++) {
          days += daysInMonth(i, year);
        }
        return days;
      }

      return date.getDate() + daysUpToMonth(date.getMonth(), date.getYear());
    });

    var minNormalizedDay = Math.min.apply(Math, rawNormalizedDays);

    return rawNormalizedDays.map(function(day) {
      if (typeof day === "number") {
        return day - minNormalizedDay;
      } else {
        return day;
      }
    });
  }),

  sortedIterationDays: Ember.computed("iterationDays.@each", function() {
    var days = this.get("iterationDays");
    var uniqueDays = [];
    days.forEach(function(day, i, days) {
      if (day != null && uniqueDays.indexOf(day) === -1) {
        uniqueDays.push(day);
      }
    });
    uniqueDays.sort(function(a, b) {
      if (a > b) return 1;
      else if (a < b) return -1;
      else return 0;
    });
    return uniqueDays;
  }),

  cumulativeStoryPoints: Ember.computed("iterationDays.@each", "sortedIterationDays", function() {
    var iterationDays = this.get("iterationDays");
    var sorted = this.get("sortedIterationDays");
    var points = [];
    this.get("project.features").forEach(function(feature, i, features) {
      if (iterationDays[i] != null) {
        var point = points[sorted.indexOf(iterationDays[i])];
        points[sorted.indexOf(iterationDays[i])] = (point + feature.get("estimate")) || feature.get("estimate");
      }
    });
    points.forEach(function(point, i, points) {
      if (i > 0) {
        points[i] = points[i - 1] + point;
      }
    });
    return points;
  }),

  burndown: Ember.computed("totalStoryPoints", "cumulativeStoryPoints.@each", function() {
    var total = this.get("totalStoryPoints");
    return this.get("cumulativeStoryPoints").map(function(point) {
      return total - point;
    });
  }),

  init: function() {
    this.get("burndown")
    this.get("sortedIterationDays")
  }
});
