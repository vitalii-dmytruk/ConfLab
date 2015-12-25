define([
    'backbone.radio',
    'text!auth/LoginViewTemplate.html',
    'backbone',
    'backbone.marionette',
    'backbone.stickit'
], function (Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            form  : '#login-form',
            cancel: '#cancel'
        },

        events: {
            'submit @ui.form' : login,
            'click @ui.cancel': cancel
        },

        bindings: {
            '#username': 'username',
            '#password': 'password'
        },

        initialize: function () {
            this.model = new Backbone.Model();
        },

        onRender: function () {
            this.stickit();
        }
    });


    function login() {
        this.trigger('login:confirm', this.model);
        return false;
    }

    function cancel() {
        this.trigger('login:cancel', this.model);
    }
});
