Probe.ProjectData = Ember.Object.extend({
  totalStoryPoints: Ember.computed("project.features.@each", function() {
    return this.get("project.features").reduce(function(sum, story) {
      return sum + story.get("estimate");
    }, 0);
  }),

  rawIterationDays: Ember.computed("project.acceptedFeatures.@each", function() {
    var rawNormalizedDays = this.get("project.acceptedFeatures").map(function(feature) {
      var date = feature.get("acceptedAt");

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

  startDate: Ember.computed("rawIterationDays.@each", function() {
    var rawIterationDays = this.get("rawIterationDays");
    if (rawIterationDays.length < 1) {
      return null;
    }

    var min = Math.min.apply(Math, rawIterationDays);

    var accepted = this.get("project.acceptedFeatures");
    return accepted[rawIterationDays.indexOf(min)].get("acceptedAt");
  }),

  iterationDays: Ember.computed("rawIterationDays.@each", function() {
    var days = this.get("rawIterationDays");
    if (days.length === 0) return [];

    var uniqueDays = [ ];
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

  cumulativeStoryPoints: Ember.computed("iterationDays.@each", "totalStoryPoints", function() {
    var rawDays = this.get("rawIterationDays");
    if (rawDays.length === 0) return [];

    var days = this.get("iterationDays");
    var points = [];
    this.get("project.acceptedFeatures").forEach(function(feature, i, features) {
      if (rawDays[i] != null) {
        var point = points[days.indexOf(rawDays[i])];
        points[days.indexOf(rawDays[i])] = (point + feature.get("estimate")) || feature.get("estimate");
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
  })
});
