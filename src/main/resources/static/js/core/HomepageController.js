define([
    'backbone.marionette'
], function(Marionette) {

    'use strict';

    return Marionette.Object.extend({
        initialize: function(options) {
            this.container = options.container;
        },

        home: function() {
            this.container.empty();
        }
    });
});