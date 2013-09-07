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
   * Ambil font yang diinginkan. Bila font sudah ada, ya
   * pakai yang itu saja.
   */
  AsciiMau.prototype.loadFont = function(name, callback) {
    // ternyata font sudah diambil sebelumnya
    if (this.fonts[name]) {
      callback && callback.call(this, this.fonts[name]);
    }
    // kalau belum, kita panggil dia
    $.get(this.fontPath + "/" + name + ".flf", function(content){
      // setelah data kasar berhasil kita peroleh,
      // kita mesti membaca internalnya.
      this.parseFont(name, content, function(font){
        // font adalah objek font yang sudah di-parse
        callback && callback.call(this, font);
      }.bind(this));

    }.bind(this));
  };

  /**
   * Saatnya menulis tulisan yang diminta oleh user. Kita
   * akan memanfaatkan objek font untuk mengubah teks tersebut
   * menjadi bentuk ASCII. 
   * @param  {String}   data     Tulisan
   * @param  {Objek}   font     Font
   * @param  {Function} callback Akan dijalankan ketika semuanya beres?
   */
  AsciiMau.prototype.write = function(writtenText, font, callback) {
    var chars = [],
        result = "",
        i;

    if (writtenText.length) {
      for (i = 0, length = writtenText.length; i < length; i++) {
        chars[i] = this.parseChar(writtenText.charCodeAt(i), font);
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

  /**
   * Tidak kenal maka tidak sayang.
   * @param  {String}   name     Nama font
   * @param  {String}   data     Data kotor
   * @param  {Function} callback Dijalankan ketika beres
   */
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

  /**
   * Ini karakter apa ya?
   * @param  {String} ch   Karakter
   * @param  {Object} font Object font
   * @return {[type]}      [description]
   */
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

  // perkenalkan diri kepada masyarakat global
  global.AsciiMau = AsciiMau;

})(this);