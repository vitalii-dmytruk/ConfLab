define([
    'backbone.marionette',
    'backbone.stickit',
    'backbone.validation'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
        initialize: function () {
            Backbone.Validation.bind(this);
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