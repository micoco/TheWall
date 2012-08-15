(function($, global) {
  global.imageAction = function() {
    var self = this,

        callback,

        $context,
        document,

        x, y,

        $image,
        $overlay;

    this.init = function(posX, posY, $editContext, publishCallback, source) {

      $context  = $editContext;
      callback  = publishCallback;

      x = posX;
      y = posY;

      document  = $context.get(0).ownerDocument;

      if (source) {
        self.setSource(source);
      }
    };

    this.setSource = function(source) {
      if (!$image) {
        $image = $('<img/>');
        $image
          .on('load', self.initOverlay)
          .attr('src', source)
          .appendTo($context);
      }

      self.setPosition();

    };

    this.setPosition = function() {
      if ($image) {
        $image.css({
          'position': 'absolute',
          'left':     x,
          'top':      y
        });
      }
    };

    this.initOverlay = function() {
      $overlay = $('<div/>');
      $overlay
        .css({
          'position': 'absolute',
          'left':     x,
          'top':      y,
          'width':    $image.width(),
          'height':   $image.height(),
          'zIndex':   6
        })
        .on('drag',   self.moveImage)
        .on('resize', self.resizeImage)
        .appendTo('body')
        .resizable({
          aspectRatio:  true,
          handles:      'ne, se, sw, nw'
        })
        .draggable();
    };

    this.moveImage = function(e, ui) {
      x = ui.offset.left;
      y = ui.offset.top;

      self.setPosition();
    };

    this.resizeImage = function(e, ui) {
      $image.css({
        width:  ui.size.width,
        height: ui.size.height
      });

      x = ui.position.left;
      y = ui.position.top;

      self.setPosition();
    };
  }
})(jQuery, this);