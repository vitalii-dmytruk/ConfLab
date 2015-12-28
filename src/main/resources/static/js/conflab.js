require([
    'core/ConfLabsApp',
    'bootstrap'
], function (ConfLabApp) {

    'use strict';

    $(function () {
        new ConfLabApp().start();
    });

    _.extend(Backbone.Validation.callbacks, {
        valid  : function (view, attr, selector) {
            var $el    = view.$('#' + attr),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el    = view.$('#' + attr),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

});