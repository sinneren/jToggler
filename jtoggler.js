;( function( $, window, document, undefined ) {

    "use strict";

        var pluginName = "jtoggler",
            defaults = {
                className: ""
            };

        function Toggler ( element, options ) {
            this.element = element;

            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        $.extend( Toggler.prototype, {
            init: function() {
                this.generateHTML();
            },
            generateHTML: function() {
                var $element = $(this.element);
                var $wrapper = $('<label />', {
                    class: $.trim("jtoggler-wrapper " + defaults.className),
                });
                var $control = $('<div />', {
                    class: 'jtoggler-control'
                });
                var $handle = $('<div />', {
                    class: 'jtoggler-handle'
                });
                $control.append($handle);
                $element.wrap($wrapper).after($control);
            },

        } );

        $.fn[ pluginName ] = function( options ) {
            return this.each( function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" +
                        pluginName, new Toggler( this, options ) );
                }
            } );
        };

} )( jQuery, window, document );