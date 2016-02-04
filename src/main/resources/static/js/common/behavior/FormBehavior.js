define([
    'backbone.marionette',
    'backbone.stickit',
    'backbone.validation'
], function () {

    'use strict';

    return Marionette.Behavior.extend({

        ui: {
            submitBtn: '[data-submit-btn]',
            cancelBtn: '[data-cancel-btn]'
        },

        triggers: {
            'click @ui.submitBtn': 'submit',
            'click @ui.cancelBtn': 'cancel'
        },

        onRender: function () {
            Backbone.Validation.bind(this.view);
            this.view.stickit();
        }
    });

});
