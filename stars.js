//=============================================================================
// Stars
//=============================================================================

Stars = {

  Defaults: {
    fullscreen: true,
    stats:  true,
    stars:  500,
    layers: [
      { percent: 50, size: 0.5, speed: { min:  8,  max:  16 }, color: '#333' },
      { percent: 30, size: 1,   speed: { min: 16,  max:  32 }, color: '#666' },
      { percent: 10, size: 1.5, speed: { min: 32,  max:  64 }, color: '#999' },
      { percent:  8, size: 2,   speed: { min: 64,  max: 128 }, color: '#AAA' },
      { percent:  1, size: 2.5, speed: { min: 128, max: 256 }, color: '#CCC' },
      { percent:  1, size: 3,   speed: { min: 256, max: 512 }, color: '#FFF' }
    ]
  },

  //-----------------------------------------------------------------------------

  initialize: function(runner, cfg) {
    this.cfg    = cfg;
    this.runner = runner;
    this.width  = runner.width;
    this.height = runner.height;
    this.layers = this.initializeLayers(this.cfg.layers);
    this.stars  = this.initializeStars(this.cfg.stars);
    this.runner.start();
  },

  update: function(dt) {
    var star, n, max = this.stars.length;
    for(n = 0 ; n < max ; n++) {
      star = this.stars[n];
      if (star.dx > 0)
        star.x = star.x + (star.dx * dt);
      if (star.x > this.width)
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

  initializeStars: function(count) {
    var n, layer, stars = [];
    for(n = 0 ; n < count ; n++) {
      layer = this.randomLayer();
      stars.push({
        x:     Game.random(0, this.width),
        y:     Game.random(0, this.height),
        dx:    Game.random(layer.speed.min, layer.speed.max),
        dy:    0,
        color: layer.color,
        size:  Game.random(0.5, layer.size)
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
    this.width = width;
    this.height = height;
    this.stars = this.initializeStars(this.cfg.stars);
  },

  //=============================================================================

}; // Stars
