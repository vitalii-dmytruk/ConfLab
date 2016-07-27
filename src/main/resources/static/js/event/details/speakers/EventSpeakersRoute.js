define([
    'event/details/ModelManagementRoute',
    'event/details/speakers/SpeakerPillView',
    'speaker/details/SpeakerDetailsRoute',
    'speaker/SpeakerCollection',
    'speaker/speakerViewFactory',
    'speech/SpeechModel'
], function (NavigationRoute, SpeakerPillView, SpeakerDetailsRoute, SpeakerCollection,
             speakerViewFactory, SpeechModel) {

    'use strict';

    return NavigationRoute.extend({
        className: 'nav nav-pills nav-stacked',
        childView: SpeakerPillView,

        getRouteClass: function () {
            return SpeakerDetailsRoute;
        },

        routeOptions: function (options) {
            return {event: options.event}
        },

        initialize: function (options) {
            this.event = options.event;
        },

        fetch: function () {
            this.navsCollection = new SpeakerCollection();
            return this.navsCollection.fetch({data: {eventId: this.event.get('id')}});
        },

        create: function (model) {
            var speech = new SpeechModel({
                event: this.event,
                title: 'undefined'
            });

            speech.get('speakers').add(model);
            return speech.save();
        },

        getCreationView: function () {
            return new speakerViewFactory.itemEditView({
                model: new this.navsCollection.model()
            });
        }
    });

});