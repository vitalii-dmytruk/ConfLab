define([
    'event/details/ModelManagementRoute',
    'event/details/speeches/SpeechPillView',
    'speech/details/SpeechDetailsRoute',
    'speech/SpeechCollection',
    'speech/speechViewFactory'
], function (NavigationRoute, SpeechPillView, SpeechDetailsRoute, SpeechCollection,
             speechViewFactory) {

    'use strict';

    return NavigationRoute.extend({
        className: 'nav nav-pills nav-stacked',
        childView: SpeechPillView,

        getRouteClass: function () {
            return SpeechDetailsRoute;
        },

        routeOptions: function (options) {
            return {event: options.event}
        },

        initialize: function (options) {
            this.event = options.event;
        },

        fetch: function () {
            this.navsCollection = new SpeechCollection();
            return this.navsCollection.fetch({data: {eventId: this.event.get('id')}});
        },

        create: function (model) {
            model.set('event', this.event);
            return model.save();
        },

        getCreationView: function () {
            return new speechViewFactory.itemEditView({
                model: new this.navsCollection.model()
            });
        }
    });

});