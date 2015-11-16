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
            require(['auth/LoginLayoutView'], function(LoginLayoutView){
                self.container.show(new LoginLayoutView({model: self.application.authentication}));
            });
        }
    });
});
