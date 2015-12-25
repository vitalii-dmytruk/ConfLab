define([
    'backbone.marionette',
    'backbone.stickit',
    'backbone.validation'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
        initialize: function () {
            Backbone.Validation.bind(this);

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
        },

        ui: {
            submitBtn: '[data-submit-btn]',
            cancelBtn: '[data-cancel-btn]'
        },

        triggers: {
            'click @ui.submitBtn': 'submit',
            'click @ui.cancelBtn': 'cancel'
        },

        onRender: function () {
            this.stickit();
        }
    });
});