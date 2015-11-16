define([
    'backbone.marionette'
], function(Marionette){

    'use strict';

    return Marionette.Object.extend({

        initialize: function(options) {
            this.container = options.container;
            this.application = options.application;
        },

        login: function() {
            var self = this;
            require(['LoginView'], function(LoginView){
                self.container.show(new LoginView({model: self.application.authentication}));
            });
        }
    });
});
