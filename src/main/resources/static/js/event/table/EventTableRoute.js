define([
    'common/Route',
    'event/table/EventTableView'
], function (Route, EventTableView) {

    'use strict';

    return Route.extend({
        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function () {
            if (this.collection.isNew) {
                return this.collection.fetch();
            }
        },

        render: function () {
            this.view = new EventTableView({
                collection: this.collection
            });
            this.container.show(this.view);
        }

    });
});