define([
    'common/Route',
    'event/EventModel',
    'event/show/ShowEventView'
], function (Route, EventModel, ShowEventView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new EventModel({id: id});
                return this.model.fetch();
            }
        },

        render: function () {
            this.view = new ShowEventView({
                model: this.model
            });
            this.container.show(this.view);
        }
    });
});