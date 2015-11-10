define([
    'backbone',
    'backbone.marionette',
    'core/ConfLabsLayoutView'
], function (Backbone, Marionette, ConfLabsLayoutView) {

    'use strict';

    return Marionette.Application.extend({

        initialize: function () {
            this.layout = new ConfLabsLayoutView();
            this.layout.render();
        },

        onStart: function () {
            if (Backbone.history) {
                Backbone.history.start();
            }
        }
    });

});