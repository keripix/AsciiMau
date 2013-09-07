(function(global, $){
  var asciiMau = new global.AsciiMau({
        fontPath: "./../fonts"
      }),
      fontList = global.fontList,
      $fontlistEl = $("#font-list"),
      $tulisan = $("#tulisan"),
      currentFont;

  /**
   * Memuat fonts
   */
  
  fontList.forEach(function(key){
    key = key.charAt(0).toUpperCase() + key.substr(1);
    $fontlistEl.append("<option value='" + key + "'>" + key + "</option>")
  }, this);

  /**
   * Yang bertugas merender font
   */
  function renderFont(writtenData, font){
    asciiMau.write(writtenData, font, function(asciiArt){
      $("#asciiArt").html("<pre>" + asciiArt + "</pre>")
    });
  }

  /**
   * Event handler yang akan kita gunakan
   */
  
  $(document).on("fontUpdated", function(e, data){
    // muat font, dan ketika selesai jalankan callback
    asciiMau.loadFont(data.fontName, function(font){
      // publikasikan kepada dunia bahwa font sudah siap
      // dipakai
      $(document).trigger("fontLoaded", {
        font: font
      });
    });
  });

  $(document).on("fontLoaded", function(e, data){
    if (data.font) {
      currentFont = data.font;
      // publikasikan bahwa font yang seharusnya dipakai
      // untuk menuliskan asciiArt sudah berubah
      $(document).trigger("currentFontUpdated", {
        currentFont: currentFont
      });
    }
  });

  $(document).on("currentFontUpdated", function(e, data){
    renderFont($tulisan.val(), data.currentFont);
  });

  $(document).on("writtenTextUpdated", function(e, data){

  });

  $(document).on("asciiArtUpdated", function(e, data){
    if (data.asciiArt) {
      $("#asciiArt").html("<pre>" + data.asciiArt + "</pre>")
    }
  });
  
  /**
   * Mendengarkan events
   */
  $fontlistEl.change(function(){
    $(document).trigger("fontUpdated", {
      fontName: $(this).val()
    });
  });

  $tulisan.keyup(function(){
    $(document).trigger("writtenTextUpdated", {
      text: $(this).val()
    });
    // renderFont($(this).val());
  });
  

})(this, $);