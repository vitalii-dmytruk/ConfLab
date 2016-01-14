require([
    'core/ConfLabsApp',
    'core/AjaxConfig',
    'bootstrap',
    'backbone.validation'
], function (confLabApp, AjaxConfig) {

    'use strict';

    $(function () {
        new AjaxConfig();

        confLabApp.start();
    });

    _.extend(Backbone.Validation.callbacks, {
        valid  : function (view, attr) {
            var $el    = view.$('#' + attr),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error) {
            var $el    = view.$('#' + attr),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });


    $.ajaxSettings.converters["text json"] = function (data) {
        return data ? $.parseJSON(data) : {};
    }
});