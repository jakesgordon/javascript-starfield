//=============================================================================
// Stars
//=============================================================================

Stars = {

  Defaults: {
    fullscreen: true,
    stats:      true,
    dir:       'right',
    layers: [
      { percent:  30, size: { min: 0.4, max: 1.0 }, speed: { min:    8, max:   16 }, colors: ['#111', '#111', '#511'] }, // 1 in 3 get a tint of red
      { percent:  25, size: { min: 0.6, max: 1.2 }, speed: { min:   16, max:   32 }, colors: ['#333', '#333', '#533'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 0.8, max: 1.4 }, speed: { min:   32, max:   64 }, colors: ['#555', '#555', '#555'] }, // 1 in 3 get a tint of red
      { percent:  15, size: { min: 1.0, max: 1.6 }, speed: { min:   64, max:  128 }, colors: ['#777'] },
      { percent:   8, size: { min: 1.2, max: 1.8 }, speed: { min:  128, max:  256 }, colors: ['#999'] },
      { percent:   4, size: { min: 1.4, max: 2.0 }, speed: { min:  256, max:  512 }, colors: ['#BBB'] },
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
    this.initLayers(cfg.layers);
    this.initStars();
    this.changeDirection(cfg.dir);
    this.runner.start();
  },

  update: function(dt) {
    var star, n, max = this.stars.length;
    for(n = 0 ; n < max ; n++) {
      star = this.stars[n];
      star.x = star.x + (star.dx != 0 ? (star.dx * dt) : 0);
      star.y = star.y + (star.dy != 0 ? (star.dy * dt) : 0);
      if ((star.x < 0) || (star.y < 0) || (star.x > this.width) || (star.y > this.height))
        this.positionStar(star);
    }
  },

  draw: function(ctx) {
    var star, n;
    for(n = 0 ; n < this.stars.length ; n++) {
      star = this.stars[n];
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    }
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
        color: layer.colors[Math.round(Game.random(0, layer.colors.length))],
        size:  Game.random(layer.size.min, layer.size.max)
      });
    }
  },

  positionStars: function() {
    var n, count = this.stars.length;
    for(n = 0 ; n < count ; n++)
      this.positionStar(this.stars[n], true);
  },

  positionStar: function(star, random) {
    if (this.cfg.left || this.cfg.right) {
      star.x  = random ? Game.random(0, this.width) : (this.cfg.left ? 0 : this.width);
      star.y  = Game.random(0, this.height);
      star.dx = Game.random(star.layer.speed.min, star.layer.speed.max) * (this.cfg.left ? 1 : -1);
      star.dy = 0;
    } else {
      star.x  = Game.random(0, this.width);
      star.y  = random ? Game.random(0, this.height) : (this.cfg.up ? 0 : this.height);
      star.dx = 0;
      star.dy = Game.random(star.layer.speed.min, star.layer.speed.max) * (this.cfg.up ? 1 : -1);
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
    this.cfg.left  = (dir == 'left');
    this.cfg.right = (dir == 'right');
    this.cfg.up    = (dir == 'up');
    this.cfg.down  = (dir == 'down');
    this.positionStars();
  },

  onkeydown: function(keyCode) {
    if ((keyCode == Game.KEY.DOWN) && !this.cfg.down)
      this.changeDirection('down');
    else if ((keyCode == Game.KEY.UP) && !this.cfg.up)
      this.changeDirection('up');
    else if ((keyCode == Game.KEY.RIGHT) && !this.cfg.right)
      this.changeDirection('right');
    else if ((keyCode == Game.KEY.LEFT) && !this.cfg.left)
      this.changeDirection('left');
  },

  onresize: function(width, height) {
    this.width  = width;
    this.height = height;
    this.initStars();
    this.positionStars();
  },

  //=============================================================================

}; // Stars
