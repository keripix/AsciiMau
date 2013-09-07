(function(global, $){
  var asciiMau = new global.AsciiMau({
        fontPath: "./../fonts"
      }),
      fontList = global.fontList,
      $fontlistEl = $("#font-list");

  /**
   * Memuat fonts
   */
  fontList.forEach(function(key){
    key = key.charAt(0).toUpperCase() + key.substr(1);
    $fontlistEl.append("<option value='" + key + "'>" + key + "</option>")
  }, this);

  /**
   * Event handler yang akan kita gunakan
   */
  function handleLoadedFont(content){
    console.log(content);
  }
  
  /**
   * Mendengarkan events
   */
  $fontlistEl.change(function(){
    asciiMau.loadFont($(this).val(), handleLoadedFont);
  });
  

})(this, $);