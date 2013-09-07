// not used, could be implemented, maybe AJAX browser cache is good enough? do some research!
var fontCache = {};

$(function(){

  // populate the select box
  for(var i = 0; i<Figlet.fontList.length; i++){
    var fontTitle = Figlet.fontList[i].replace('.flf','').replace('.aol',''); // remove the file extentions for the title
    $('#fontSelector').append('<option value = "'+Figlet.fontList[i]+'">'+fontTitle+'</option>');
  }

  // protip : understanding the following two blocks of code will make you jQuery ninja

  /***** NAMED EVENTS *****/

  // change the font and load a new font via jQuery async AJAX request
  $(document).bind('##CHANGE_FONT##', function(e, data){
    Figlet.loadFont(data.fontName, function(rsp){
      $(document).trigger('##RENDER_ASCII_ART##', {font:rsp}); // the font has changed, lets call the render ascii art event
    });
  });

  $(document).bind('##RENDER_ASCII_ART##', function(e){
    Figlet.write($('#theCode').val(), $('#fontSelector').val(), function(str) {
      debug.log(str);
      $('#asciiArt').html('<pre>' + str + '</pre>');
    });
  });

  /**** END NAMED EVENTS ****/

  /**** BIND UI EVENTS ****/

  // select box change
  $('#fontSelector').change(function(){
    $(document).trigger('##CHANGE_FONT##', {"fontName":$(this).val()})
  });

  // you would think jQuery.change() would cover the keypress event on select boxes? 
  $("#fontSelector").keypress(function (){
    $(document).trigger('##CHANGE_FONT##', {"fontName":$(this).val()})
  });

  // keyup on textarea
  $('#theCode').keyup(function(e){
    $(document).trigger('##RENDER_ASCII_ART##');
  });

  $('#run').click(function(e){
    $(document).trigger('##RENDER_ASCII_ART##');
  });

  /**** END UI BIND EVENTS ****/

  // little bit of a onReady hack. i'll fix the API a bit so this can be done better
  $(document).trigger('##CHANGE_FONT##', {"fontName":'Doh'});
  $('#fontSelector').val('doh');

});