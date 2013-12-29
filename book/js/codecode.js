/*!
 * codecode.
 * v0.0.3 @stephenplusplus 4/1/13
 * github.com/stephenplusplus/codecode
 */
(function($, win, doc) {
  var styles
  ='.acodecode {'
  +  'cursor: pointer;'
  +'}'

  +'.acodecodeactive {'
  +  'cursor: default;'
  +'}'

  +'.codecodecode {'
  +  'position: fixed;'
  +  'z-index: 100;'
  +  'left: 2%;'
  +  'bottom: -30px;'
  +  'width: 96%;'
  +  'height: 0;'
  +  'max-height: 270px;'
  +  'text-align: left;'
  +'}'

  +'.codecodecode > div {'
  +'  box-shadow: 0 0 3px #444;'
  +'}'

  +'.codecodecontrols {'
  +  'height: 30px;'
  +  'margin-top: -30px;'
  +  'background-color: #fff;'
  +  'background-color: rgba(255, 255, 255, .8);'
  +  'border-radius: 8px 8px 0 0;'
  +'}'

  +'.codecodecontrols a {'
  +  'float: left;'
  +  'line-height: 30px;'
  +  'margin-left: 6px;'
  +  'font-family: Arial;'
  +  'font-size: 12px;'
  +'}'

  +'.codecodecontrols .closecodecode {'
  +  'float: right;'
  +  'margin-right: 6px;'
  +'}'

  +'.codecode {'
  +  'border-radius: 0 !important;'
  +  'position: relative !important;'
  +  'width: 100% !important;'
  +  'margin: 0 !important;'
  +  'overflow: auto !important;'
  +  'cursor: default !important;'
  +'}'

  +'div.codecode [id^=highlighter] div.bar.show,'
  +'div.codecode [id^=highlighter] div.toolbar {'
  +  'display: none !important;'
  +'}';

  var el = {};
  el.body
  = $(doc.body);

  el.codecodecode
  = $('<div class="codecodecode">'
     +  '<div class="codecodecontrols">'
     +    '<a class="gobacktothecode" href="#">go back to the code.</a>'
     +    '<a class="closecodecode" href="#">close.</a>'
     +  '</div>'
     +  '<div class="codecode"></div>'
     +'</div>');

  el.gobacktothecode
  = el.codecodecode.find('.gobacktothecode');

  el.closecodecode
  = el.codecodecode.find('.closecodecode');

  el.codecode
  = el.codecodecode.find('.codecode');

  el.body
    .append('<style>'+styles+'</style>')
    .append(el.codecodecode);

  var codeposition;

  var gobacktothecode = function(e) {
    e.preventDefault();

    closecodecode();

    el.body.animate({ scrollTop: codeposition - 20 }, 2000);
  };

  var closecodecode = function(e, callback) {
    if ($.type(e) === 'object')
      e.preventDefault();

    el.body.off('keyup');

    el.codecodecode
      .animate({ bottom: '-300px' }, 300, callback || $.noop);

    $('.acodecodeactive').removeClass('acodecodeactive');
  };

  var opencodecode = function(codeblock) {
    el.codecodecode
      .animate({ bottom: 0 }, 500);

    el.body.on('keyup', function(e) {
      if (e.which === 27)
        closecodecode();
    });

    codeblock
      .addClass('acodecodeactive');
  };

  var bindcodecodeclick = function(selector) {
    el.body.on('click', selector, function() {
      var codeblock = $(this);

      if (codeblock.hasClass('acodecodeactive') || codeblock.hasClass('codecode'))
        return;

      codeposition = $(this).position().top;

      var clone =
        codeblock
          .clone()
          .addClass('codecode');

      closecodecode(null, function() {
        el.codecode
          .empty()
          .append(clone.css('margin', '0 !important'))
          .height('auto');

        el.codecodecode
          .height(el.codecode.height() >= 270 ? 270 : el.codecode.height());

        el.codecode
          .height('100%');
      });

      opencodecode(codeblock);
    });
  };

  el.gobacktothecode
    .on('click', gobacktothecode);

  el.closecodecode
    .on('click', closecodecode);

  $.fn.codecode = function() {
    bindcodecodeclick(this.selector);

    return this.addClass('acodecode');
  };

  if (typeof SyntaxHighlighter !== 'undefined')
    SyntaxHighlighter.all = (function() {
      var callsyntaxhighlighter = SyntaxHighlighter.all
        , syntaxactivated = false
        , checkforsyntaxels
        , tried = 0;

      var hassyntaxbeenhighlighted = function() {
        if ($('.syntaxhighlighter').length > 0)
          $('.syntaxhighlighter').codecode(),
          syntaxactivated = true;

        if (syntaxactivated || tried++ > 50)
          win.clearInterval(checkforsyntaxels);
      };

      return function() {
        callsyntaxhighlighter();

        checkforsyntaxels = win.setInterval(hassyntaxbeenhighlighted, 50);
      }
    })();

})(jQuery, window, document);
