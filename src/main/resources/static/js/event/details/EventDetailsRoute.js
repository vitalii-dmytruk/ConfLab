define([
    'common/route/Route',
    'event/EventModel',
    'event/details/EventDetailsView'
], function (Route, EventModel, EventDetailsView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        onBeforeFetch: function (eventId) {
            this.view = this.container.currentView;
            if (this.view instanceof EventDetailsView) {
                this.model = this.view.model;
                this.model.set({id: eventId}, {silent: true});
            } else {
                this.model = new EventModel({id: eventId});
                this.view  = new EventDetailsView({model: this.model});
                this.container.show(this.view)
            }
        }

    });

});