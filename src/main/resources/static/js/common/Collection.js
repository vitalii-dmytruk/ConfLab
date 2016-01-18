define([
    'backbone'
], function () {

    'use strict';

    return Backbone.Collection.extend({
        constructor: function () {
            Backbone.Collection.apply(this, arguments);
            this.once('sync', function (object) {
                this.isNew = false;
            });
        },

        isNew: true

    });

});
