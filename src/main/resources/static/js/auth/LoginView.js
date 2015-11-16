define([
    'backbone.marionette',
    'auth/Authentication',
    'text!auth/LoginLayoutTemplate.html'
], function(Marionette, AuthenticationModel, template){

    'use strict';

    return Marionette.ItemView.extend({
        tagName: 'form',
        className: 'form-horizontal',
        template: _.template(template),

        ui: {
            username: 'input#username',
            password: 'input#password',
            signInButton: 'button#signIn'
        },

        events: {
            'click @ui.signInButton': 'signIn'
        },

        signIn: function() {
            this.model.signIn(this.ui.username.val(), this.ui.password.val());
            return false;
        }
    });
});
