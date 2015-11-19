define([
    'backbone.marionette',
    'backbone.radio',
    'text!auth/LoginLayoutTemplate.html'
], function (Marionette, Radio, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName  : 'form',
        className: 'form-horizontal',
        template : _.template(template),

        ui: {
            username    : 'input#username',
            password    : 'input#password',
            signInButton: 'button#signIn'
        },

        events: {
            'click @ui.signInButton': 'signIn'
        },

        signIn: function () {
            Radio.channel('session').request('signIn', this.ui.username.val(), this.ui.password.val());
            return false;
        }
    });
});
