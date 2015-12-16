define([
    'backbone.marionette',
    'backbone.stickit'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
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