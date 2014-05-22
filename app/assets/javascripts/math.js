Probe.Math = Ember.Object.create({
  mean: function(x) {
    return this.sum(x) / x.length;
  },

  sum: function(x) {
    var len = x.length,
        s = 0;
    for (var i = 0; i < len; i++) {
      s += x[i];
    }
    return s;
  },

  squaredSum: function(x) {
    var len = x.length,
        s = 0;
    for (var i = 0; i < len; i++) {
      s += x[i] * x[i];
    }
    return s;
  },

  sumOfProducts: function(x, y) {
    var len = Math.min(x.length, y.length),
        s = 0;
    for (var i = 0; i < len; i++) {
      s += x[i] * y[i];
    }
    return s;
  },

  covariance: function(x, y) {
    var len = x.length,
        z = [],
        mx = this.mean(x),
        my = this.mean(y);
    for (var i = 0; i < len; i++) {
      z[i] = (x[i] - mx) * (y[i] - my);
    }
    return this.mean(z);
  },

  variance: function(x) {
    var len = x.length,
        mx = this.mean(x),
        z = [];
    for (var i = 0; i < len; i++) {
      z[i] = (x[i] - mx) * (x[i] - mx);
    }
    return this.mean(z);
  },

  stdDev: function(x) {
    return Math.sqrt(this.variance(x));
  },

  pearsonProductMomentCoefficient: function(x, y) {
    return this.covariance(x, y) / (this.stdDev(x) * this.stdDev(y));
  }
});
