define([
    'common/route/Route'
], function (Route) {

    'use strict';

    return Route.extend({
        initialize: function (options) {
            this.container  = options.container;
        },

        fetch: function () {
            this.collection = new this.collectionClass();
            return this.collection.fetch({reset: true});
        },

        render: function () {
            var view = new this.tableView({
                collection: this.collection
            });
            this.container.show(view);
        }

    });
});