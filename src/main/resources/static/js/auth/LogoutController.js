define([
    'backbone.marionette'
], function(Marionette) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function(options) {
            this.app = options.application;
        },

        logout: function() {
            this.app.authentication.signOut();
        }
    });
});
