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
                var $element = $(this.element);

                if ($element.data('jtmulti-state') != null) {
                    this.generateThreeStateHTML();
                } else {
                    this.generateTwoStateHTML();
                }
            },
            events: function() {
                var $element = $(this.element);
                var instance = this;

                $element.on('change', this, function (event) {
                    if ($element.data('jtlabel')) {
                        if ($element.data('jtlabel-success')) {
                            if ($element.prop('checked')) {
                                $element.next().next().text($element.data('jtlabel-success'));
                            } else {
                                $element.next().next().text($element.data('jtlabel'));
                            }
                        } else {
                            instance.setWarningLabelMessage();
                        }
                    }

                    $(document).trigger('jt:toggled', [event.target]);
                });

                if (!$element.prop('disabled')) {
                    var $control = $element.next('.jtoggler-control');
                    $control
                        .find('.jtoggler-radio')
                        .on('click', this, function (event) {
                            $(this)
                                .parents('.jtoggler-control')
                                .find('.jtoggler-btn-wrapper')
                                .removeClass('is-active');

                            $(this)
                                .parent()
                                .addClass('is-active');

                            if ($(event.currentTarget).parent().index() === 2) {
                                $control.addClass('is-fully-active');
                            } else {
                                $control.removeClass('is-fully-active');
                            }

                            $(document).trigger('jt:toggled:multi', [event.target]);
                        });
                }
            },
            generateTwoStateHTML: function() {
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

                if ($element.data('jtlabel')) {

                    var $label = $('<div />', {
                        class: 'jtoggler-label',
                    });

                    if ($element.prop('checked')) {
                        if ($element.data('jtlabel-success')) {
                            $label.text($element.data('jtlabel-success'));
                        } else {
                            this.setWarningLabelMessage();
                            $label.text($element.data('jtlabel'));
                        }
                    } else {
                        $label.text($element.data('jtlabel'));
                    }

                    $control.after($label);
                }

            },
            generateThreeStateHTML: function() {
                var $element = $(this.element);

                var $wrapper = $('<div />', {
                    class: $.trim("jtoggler-wrapper jtoggler-wrapper-multistate " + this._defaults.className),
                });
                var $control = $('<div />', {
                    class: 'jtoggler-control',
                });
                var $handle = $('<div />', {
                    class: 'jtoggler-handle',
                });
                for (var i = 0; i < 3; i++) {
                    var $label = $('<label />', {
                        class: 'jtoggler-btn-wrapper',
                    });
                    var $btn = $('<input />', {
                        type: 'radio',
                        name: 'options',
                        class: 'jtoggler-radio',
                    });

                    $label.append($btn);
                    $control.prepend($label);
                }
                $control.append($handle);
                $element.wrap($wrapper).after($control);
                $control.find('.jtoggler-btn-wrapper:first').addClass('is-active');

            },
            setWarningLabelMessage: function() {
                console.warn('Data attribute "jtlabel-success" is not set');
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