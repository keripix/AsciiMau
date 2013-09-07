(function(global, $){

  function AsciiMau(cfg) {
    this.fontPath = cfg.fontPath;
    this.currentFont = undefined;
  }

  AsciiMau.prototype.getFontPath = function(){
    return this.fontPath;
  };

  /**
   * Load the requested font based on its name. It is
   * expected that the name of the file and the name
   * of the requested font is the same (case-sensitive)
   * @param  {String}   name     Font name
   * @param  {Function} callback Callback
   */
  AsciiMau.prototype.loadFont = function(name, callback) {
    console.log(name);
    $.get(this.fontPath + "/" + name + ".flf", function(content){
      callback && callback.call(this, content);
    });
  };

  AsciiMau.prototype.write = function(data, font, callback) {
    
  };

  AsciiMau.prototype.parseFont = function() {
    // body...
  };

  AsciiMau.prototype.parseChar = function() {
    // body...
  };

  global.AsciiMau = AsciiMau;

})(this, $);