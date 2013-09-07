(function(global, $){
  var asciiMau = new global.AsciiMau({
        fontPath: "./../fonts"
      }),
      fontList = global.fontList,
      $fontlistEl = $("#font-list"),
      $tulisan = $("#tulisan"),
      currentFont = undefined;

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
  
  $(document).on("fontUpdated", function(e, data){

  });

  $(document).on("fontLoaded", function(e, data){
    currentFont = data.font;
  });

  $(document).on("writtenTextUpdated", function(e, data){

  });

  $(document).on("asciiArtUpdated", function(e, data){
    if (data.asciiArt) {
      $("#asciiArt").html("<pre>" + data.asciiArt + "</pre>")
    }
  });
  
  function handleLoadedFont(font){
    renderFont($tulisan.val(), font);
  }

  function renderFont(writtenData, font){
    asciiMau.write(writtenData, font, function(asciiArt){
      $("#asciiArt").html("<pre>" + asciiArt + "</pre>")
    });
  }
  
  /**
   * Mendengarkan events
   */
  $fontlistEl.change(function(){
    $(document).trigger("fontUpdated", {
      name: $(this).val()
    });
    // asciiMau.loadFont($(this).val(), handleLoadedFont);
  });

  $tulisan.keyup(function(){
    $(document).trigger("writtenTextUpdated", {
      text: $(this).val()
    });
    // renderFont($(this).val());
  });
  

})(this, $);