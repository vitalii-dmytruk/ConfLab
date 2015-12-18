define([
    'common/route/Route',
    'common/view/ListView',
    'event/table/EventRowView'
], function (Route, ListView, EventRowView) {

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
            this.view = new ListView({
                collection: this.collection,
                childView: EventRowView,
                title: 'Conferences'
            });
            this.container.show(this.view);
        }

    });
});