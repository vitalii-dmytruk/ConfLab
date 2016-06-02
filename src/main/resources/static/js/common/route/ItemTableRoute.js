define([
    'common/route/Route',
    'common/ListController'
], function (Route, ListController) {

    'use strict';

    return Route.extend({
        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function () {
            this.collection = new this.collectionClass();
            return this.collection.fetch({reset: true});
        },

        render: function () {
            new ListController({
                title     : this.title,
                collection: this.collection,
                rowView   : this.rowView,
                container : this.container,
                EditView  : this.EditView
            }).enter();
        }
    });
});