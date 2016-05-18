define([
    'event/details/EventDetailsRoute',
    'event/details/schedule/EventScheduleView'
], function EventScheduleRoute(EventDetailsRoute, EventScheduleView) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            return this.model.fetch();
        },

        render: function () {
            this.view.showScheduleTab(new EventScheduleView({
                model: this.model
            }));
        }
    });
});