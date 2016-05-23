define([
    'event/details/EventDetailsRoute',
    'event/eventViewFactory'
], function (EventDetailsRoute, eventViewFactory) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            return this.model.fetch();
        },

        render: function () {
            this.view.showInfoTab(new eventViewFactory.itemDetailsView({
                model: this.model
            }));
        }
    });
});