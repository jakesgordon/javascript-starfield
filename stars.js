//=============================================================================
// Stars
//=============================================================================

Stars = {

  Defaults: {
    fullscreen: true,
    stats:      true,
    layers: [
      { percent:  40, size: { min: 0.4, max: 1.0 }, speed: { min:    8, max:   16 }, colors: ['#111', '#111', '#511'] }, // 1 in 3 get a tint of red
      { percent:  20, size: { min: 0.6, max: 1.2 }, speed: { min:   16, max:   32 }, colors: ['#333', '#333', '#533'] }, // 1 in 3 get a tint of red
      { percent:  10, size: { min: 0.8, max: 1.4 }, speed: { min:   32, max:   64 }, colors: ['#555', '#555', '#555'] }, // 1 in 3 get a tint of red
      { percent:  10, size: { min: 1.0, max: 1.6 }, speed: { min:   64, max:  128 }, colors: ['#777'] },
      { percent:  12, size: { min: 1.2, max: 1.8 }, speed: { min:  128, max:  256 }, colors: ['#999'] },
      { percent:   5, size: { min: 1.4, max: 2.0 }, speed: { min:  256, max:  512 }, colors: ['#BBB'] },
      { percent:   2, size: { min: 1.6, max: 2.2 }, speed: { min:  512, max: 1024 }, colors: ['#DDD'] },
      { percent:   1, size: { min: 1.8, max: 2.4 }, speed: { min: 1024, max: 2048 }, colors: ['#FFF'] }
    ]
  },

  //-----------------------------------------------------------------------------

  initialize: function(runner, cfg) {
    this.cfg    = cfg;
    this.runner = runner;
    this.width  = runner.width;
    this.height = runner.height;
    this.layers = this.initializeLayers(this.cfg.layers);
    this.stars  = this.initializeStars()
    this.runner.start();
  },

  update: function(dt) {
    var star, n, max = this.stars.length;
    for(n = 0 ; n < max ; n++) {
      star = this.stars[n];
      if (star.dx != 0)
        star.x = star.x + (star.dx * dt);
      if (star.x < 0)
        star.x = this.width;
      else if (star.x > this.width)
        star.x = 0;
    }
  },

  draw: function(ctx) {
    var star, n;
    for(n = 0 ; n < this.stars.length ; n++) {
      star = this.stars[n];
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2*Math.PI, true);
      ctx.fill();
      ctx.closePath();
    }
  },

  initializeLayers: function(layers) {
    var n, sum = 0, l;
    for(n = 0 ; n < layers.length ; n++) {
      l = layers[n];
      l.min = sum;
      l.max = sum + l.percent;
      sum = l.max;
    }
    return layers;
  },

  initializeStars: function() {
    var n, layer, stars = [], count = (this.height/2); // good ballpark for sensible number of stars based on screensize
    for(n = 0 ; n < count ; n++) {
      layer = this.randomLayer();
      stars.push({
        x:     Game.random(0, this.width),
        y:     Game.random(0, this.height),
        dx:    Game.random(layer.speed.min, layer.speed.max),
        dy:    0,
        color: layer.colors[Math.round(Game.random(0, layer.colors.length))],
        size:  Game.random(layer.size.min, layer.size.max)
      });
    }
    return stars;
  },

  randomLayer: function() {
    var i, n = Game.random(1, 100);
    for(i = 0 ; i < this.layers.length ; i++) {
      if (n <= this.layers[i].max)
        return this.layers[i];
    }
  },

  onresize: function(width, height) {
    this.width  = width;
    this.height = height;
    this.stars  = this.initializeStars();
  },

  //=============================================================================

}; // Stars
