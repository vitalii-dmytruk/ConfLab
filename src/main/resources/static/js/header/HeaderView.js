define([
    'backbone.marionette',
    'backbone.radio',
    'auth/User',
    'text!header/HeaderTemplate.html'
], function (Marionette, Radio, User, template) {

    'use strict';

    return Marionette.ItemView.extend({
        className: 'container-fluid',
        template : _.template(template),

        modelEvents: {
            'change:sessionUser': 'render'
        },

        initialize: function() {
            this.channel = Radio.channel('auth');
            this.channel.reply('onSessionUserChange', function(data){
                this.model.set('sessionUser', new User(data));
            }, this);
        },

        serializeData: function() {
            var user = this.model.get('sessionUser'),
                isAuthenticated = user && user.has('username');
            return _.extend({ isAuthenticated: isAuthenticated}, isAuthenticated ? user.toJSON() : {});
        }
    });

});
