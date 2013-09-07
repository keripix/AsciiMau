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
    key = key.charAt(0).toUpperCase() + key.substr(1);
    $fontlistEl.append("<option value='" + key + "'>" + key + "</option>")
  }, this);

})(this, $);