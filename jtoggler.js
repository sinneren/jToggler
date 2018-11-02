;( function( $, window, document, undefined ) {

    "use strict";

        var pluginName = "jtoggler",
            defaults = {
                className: "",
            };

        function Toggler ( element, options ) {
            this.element = element;

            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;

            this.init();
            this.events();
        }

        $.extend( Toggler.prototype, {
            init: function() {
                this.generateHTML();
            },
            events: function() {
                var $element = $(this.element);

                $element.on('change', this, function (event) {
                    $(document).trigger('jt:toggled', [event.target]);
                })
            },
            generateHTML: function() {
                var $element = $(this.element);

                var $wrapper = $('<label />', {
                    class: $.trim("jtoggler-wrapper " + this._defaults.className),
                });
                var $control = $('<div />', {
                    class: 'jtoggler-control',
                });
                var $handle = $('<div />', {
                    class: 'jtoggler-handle',
                });

                $control.prepend($handle);
                $element.wrap($wrapper).after($control);
                if ($element.data('label')) {
                    var $label = $('<div />', {
                        class: 'jtoggler-label',
                        text: $element.data('label'),
                    });
                    $control.after($label);
                }

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