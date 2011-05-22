//=============================================================================
// Stars
//=============================================================================

Stars = {

  Defaults: {
    fullscreen: true,
    stats:      true,
    dx:         -2,
    dy:          0,
    maxspeed:   10,
    layers: [
      { percent:  30, size: { min: 0.4, max: 1.0 }, speed: { min:   1, max:   2 }, colors: ['#111', '#111', '#811'] }, // 1 in 3 get a tint of red
      { percent:  25, size: { min: 0.6, max: 1.2 }, speed: { min:   2, max:   4 }, colors: ['#333', '#333', '#833'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 0.8, max: 1.4 }, speed: { min:   4, max:   8 }, colors: ['#555', '#555', '#855'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 1.0, max: 1.6 }, speed: { min:   8, max:  16 }, colors: ['#777'] },
      { percent:   8, size: { min: 1.2, max: 1.8 }, speed: { min:  16, max:  32 }, colors: ['#999'] },
      { percent:   4, size: { min: 1.4, max: 2.0 }, speed: { min:  32, max:  64 }, colors: ['#BBB'] },
      { percent:   2, size: { min: 1.6, max: 2.2 }, speed: { min:  64, max: 128 }, colors: ['#DDD'] },
      { percent:   1, size: { min: 1.8, max: 2.4 }, speed: { min: 128, max: 256 }, colors: ['#FFF'] }
    ]
  },

  //-----------------------------------------------------------------------------

  initialize: function(runner, cfg) {
    this.cfg    = cfg;
    this.runner = runner;
    this.width  = runner.width;
    this.height = runner.height;
    this.initLayers(cfg.layers);
    this.initStars();
    this.runner.start();
  },

  update: function(dt) {
    var star, n, max = this.stars.length;
    for(n = 0 ; n < max ; n++) {
      star = this.stars[n];
      star.x = star.x + (this.cfg.dx * star.speed * dt);
      star.y = star.y + (this.cfg.dy * star.speed * dt);
      if ((star.x < 0) || (star.y < 0) || (star.x > this.width) || (star.y > this.height))
        this.repositionStar(star);
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
    ctx.fillStyle = 'white';
    ctx.fillText("dx: " + this.cfg.dx, 30, 40);
    ctx.fillText("dy: " + this.cfg.dy, 30, 50);
  },

  initLayers: function(layers) {
    var n, sum = 0, l;
    for(n = 0 ; n < layers.length ; n++) {
      l = layers[n];
      l.min = sum;
      l.max = sum + l.percent;
      sum = l.max;
    }
    this.layers = layers;
  },

  initStars: function() {
    var n, layer, count = (this.height/2); // good ballpark for sensible number of stars based on screensize
    this.stars = [];
    for(n = 0 ; n < count ; n++) {
      layer = this.randomLayer();
      this.stars.push({
        layer: layer,
        color: Game.randomChoice(layer.colors),
        speed: Game.random(layer.speed.min, layer.speed.max),
        size:  Game.random(layer.size.min,  layer.size.max),
        x:     Game.random(0, this.width),
        y:     Game.random(0, this.height)
      });
    }
  },

  repositionStar: function(star) {
    var horizontal = (this.cfg.dy == 0);
    var vertical   = (this.cfg.dx == 0);
    if (horizontal || (!horizontal && !vertical && Game.randomBool())) {
      star.x = (this.cfg.dx > 0) ? 0 : this.width;
      star.y = Game.random(0, this.height);
    }
    else {
      star.x = Game.random(0, this.width);
      star.y = (this.cfg.dy > 0) ? 0 : this.height;
    }
  },

  randomLayer: function() {
    var i, n = Game.random(1, 100);
    for(i = 0 ; i < this.layers.length ; i++) {
      if (n <= this.layers[i].max)
        return this.layers[i];
    }
  },

  changeDirection: function(dir) {
    if ((dir == 'left') && (this.cfg.dx < this.cfg.maxspeed))
      this.cfg.dx = (this.cfg.dx == -1) && (this.cfg.dy == 0) ?  1 : this.cfg.dx + 1;
    else if ((dir == 'right') && (this.cfg.dx > -this.cfg.maxspeed))
      this.cfg.dx = (this.cfg.dx ==  1) && (this.cfg.dy == 0) ? -1 : this.cfg.dx - 1;
    else if ((dir == 'up') && (this.cfg.dy < this.cfg.maxspeed))
      this.cfg.dy = (this.cfg.dy == -1) && (this.cfg.dx == 0) ?  1 : this.cfg.dy + 1;
    else if ((dir == 'down') && (this.cfg.dy > -this.cfg.maxspeed))
      this.cfg.dy = (this.cfg.dy ==  1) && (this.cfg.dx == 0) ? -1 : this.cfg.dy - 1;
  },

  onkeydown: function(keyCode) {
    if (keyCode == Game.KEY.DOWN)
      this.changeDirection('down');
    else if (keyCode == Game.KEY.UP)
      this.changeDirection('up');
    else if (keyCode == Game.KEY.RIGHT)
      this.changeDirection('right');
    else if (keyCode == Game.KEY.LEFT)
      this.changeDirection('left');
  },

  onresize: function(width, height) {
    this.width  = width;
    this.height = height;
    this.initStars();
  },

  //=============================================================================

}; // Stars
