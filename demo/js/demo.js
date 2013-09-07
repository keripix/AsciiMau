(function(global, $){
  var asciiMau = new global.AsciiMau({
        fontPath: "./../fonts"
      }),
      fontList = global.fontList,
      $fontlistEl = $("#font-list");

  /**
   * Listening to events
   */
  fontList.forEach(function(key){
    $fontlistEl.append("<option value='" + key + "'>" + key + "</option>")
  }, this);

})(this, $);