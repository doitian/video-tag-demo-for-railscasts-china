function flashVideoFallback(){
  var flashplayerlocation = "/assets/jwplayer/player.swf",
      flashplayerskin = "/assets/jwplayer/glow/glow.xml";
  $('video').each(function(){
    var video = $(this);
    if (!Modernizr.video.h264 && swfobject.getFlashPlayerVersion() || window.location.hash.indexOf("flash-test") !== -1){
      video.find('source[src$=mp4]').each(function(){
        var source = $(this);
        var src = source.attr('src'),
            id = 'video_'+Math.round(1 + Math.random()*(100000)),
            width = video.attr('width'),
            height = parseInt(video.attr('height'), 10) + 30;
        video.after('<div class="flash-video"><div><div id='+id+'>');
        swfobject.embedSWF(flashplayerlocation, id, width, height + 30, "9.0.0",
          { file : src, image : video.attr('poster'), skin : flashplayerskin } ,
          { movie : src, wmode : "opaque", allowfullscreen : "true" }
        );
      });
      video.remove();
    }
  });
}

function wrapFlashVideos() {
  $('object').each(function(object) {
    object = $(object);
    if ( $('param[name=movie]', object).length ) {
      var wrapper = object.before('<div class="flash-video"><div>').previous();
      $(wrapper).children().append(object);
    }
  });
  $('iframe[src*=vimeo],iframe[src*=youtube]').each(function(iframe) {
    iframe = $(iframe);
    var wrapper = iframe.before('<div class="flash-video"><div>').previous();
    $(wrapper).children().append(iframe);
  });
}

$(function() {
  flashVideoFallback();
  wrapFlashVideos();
});