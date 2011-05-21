//=============================================================================
// Stars
//=============================================================================

Stars = {

  Defaults: {
    width:  640,   // logical canvas width (browser will scale to physical canvas size)
    height: 480    // logical canvas height (ditto)
  },

  //-----------------------------------------------------------------------------

  initialize: function(runner, cfg) {
    this.cfg         = cfg;
    this.runner      = runner;
    this.width       = runner.width;
    this.height      = runner.height;
    this.runner.start();
  },

  update: function(dt) {
  },

  draw: function(ctx) {
  },

  //=============================================================================
  // HELPER
  //=============================================================================

  Helper: {

  }

  //=============================================================================

}; // Stars
