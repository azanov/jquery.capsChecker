; (function ($, undefined) {

    var pluginName = 'capsChecker',
	    defaults   = {
			capson: false, capsoff: false
		};

    function CapsChecker( element, options ) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    CapsChecker.prototype = {
		_keyDown : function(e) {
			$(this).data('_lastKey', e.which);
		},
		_keyPress : function(e) {
			var lastKey = +$(this).data('_lastKey');
			if(lastKey < 47 || lastKey > 90) return true;
			
			var letter    = String.fromCharCode(e.which);
			var upper     = letter.toUpperCase();
			var isNumeric = lastKey < 58;
			var shift     = e.shiftKey;
			
			var caps = false;
			if(isNumeric)
				caps = (lastKey == e.which && shift) || (lastKey != e.which && !shift);
			else if( (letter === upper && !shift) || (letter !== upper && shift) )
				caps = !isNumeric;
			
			$(this).trigger('caps' + (caps ? 'on' : 'off'), caps);
			
		},
        init : function () {
            this.element.on('keydown', this._keyDown)
						.on('keypress', this._keyPress);
			this.options.capson && this.element.on('capson', this.options.capson);
			this.options.capsoff && this.element.on('capsoff', this.options.capsoff);
        },
        destroy : function () {
            this.element.off('keydown', this._keyDown)
						.off('keypress', this._keyPress)
						.removeData(['_lastKey', pluginName]);
			this.element.off('capson');
			this.element.off('capsoff');
        }
    };

    $.fn[pluginName] = function ( options, args ) {
        return this.each(function () {
            var cached = $.data( this, pluginName );
            if( cached )
            {
                options.substring && cached[options]( args );
                return 1;
            }
            cached = $(this);
            cached.data(pluginName, new CapsChecker( cached, options ));

        });
    };

})(jQuery);