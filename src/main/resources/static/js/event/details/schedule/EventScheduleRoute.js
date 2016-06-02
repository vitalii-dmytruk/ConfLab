define([
    'common/route/Route',
    'event/details/schedule/EventScheduleView'
], function EventScheduleRoute(Route, EventScheduleView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container
        },

        render: function () {
            this.container.show(new EventScheduleView({
                model: this.event
            }));
        }
    });
});