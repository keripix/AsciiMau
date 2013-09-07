(function(global){

  function AsciiMau(cfg) {
    this.fontPath = cfg.fontPath;
    this.currentFont = undefined;
    this.fonts = {};
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
    if (this.fonts[name]) {
      callback && callback.call(this, this.fonts[name]);
    }
    
    $.get(this.fontPath + "/" + name + ".flf", function(content){

      this.parseFont(name, content, function(font){
        callback && callback.call(this, font);
      }.bind(this));

    }.bind(this));
  };

  AsciiMau.prototype.write = function(data, font, callback) {
    var chars = [],
        result = "",
        i;

    if (data.length) {
      for (i = 0, length = data.length; i < length; i++) {
        chars[i] = this.parseChar(data.charCodeAt(i), font);
      }

      for(i = 0, height = chars[0].length; i < height; i++) {
        for (var j = 0; j < length; j++) {
          result += chars[j][i];
        }

        result += "\n";
      }  
    } else {
      result = "";
    }

    callback && callback.call(this, result, font);
  };

  AsciiMau.prototype.parseFont = function(name, data, callback) {
    var lines = data.split("\n"),
        header = lines[0].split(" "),
        hardblank = header[0].charAt(header[0].length - 1),
        height = +header[1],
        comments = +header[5];

    var font = this.fonts[name] = {
      data: lines.slice(comments + 1),
      hardblank: hardblank,
      height: height,
      char: {}
    };

    callback && callback.call(this, font);
  };

  AsciiMau.prototype.parseChar = function(ch, font) {
    if (ch in font.char) {
      return font.char[ch];
    }

    var height = font.height,
        start = (ch - 32) * height,
        charData = [],
        i;

    for (i = 0; i < height; i++) {
      charData[i] = font.data[start + i]
                      .replace(/@/g, "")
                      .replace(new RegExp("\\" + font.hardblank, "g"), " ");
    }

    font.char[ch] = charData;
    return font.char[ch];
  };

  global.AsciiMau = AsciiMau;

})(this);