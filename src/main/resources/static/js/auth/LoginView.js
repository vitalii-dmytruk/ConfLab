define([
    'backbone.radio',
    'text!auth/LoginViewTemplate.html',
    'backbone',
    'backbone.marionette',
    'backbone.stickit'
], function (Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName  : 'form',
        className: 'form-horizontal',
        template : _.template(template),

        ui: {
            login: '#login',
            cancel: '#cancel'
        },

        events: {
            'click @ui.login': 'login',
            'click @ui.cancel': 'cancel'
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
        },

        login: function () {
            this.trigger('login:confirm', this.model);
        },

        cancel: function () {
            this.trigger('login:cancel', this.model);
        }
    });
});
