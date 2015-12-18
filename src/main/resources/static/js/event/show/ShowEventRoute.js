define([
    '../../common/route/Route',
    'event/show/ShowEventView',
    'speaker/SpeakerCollection'
], function (Route, ShowEventView, SpeakerCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            var promise = $.Deferred().resolve();

            fetchEventModel(this, id, promise);
            fetchSpeakers(this,  promise);

            return promise;
        },

        render: function () {
            this.view = new ShowEventView({
                model: this.model,
                collection : this.model.get('speakers')
            });
            this.container.show(this.view);
        }
    });

    function fetchEventModel(route, id, promise) {
        route.model = route.collection.get(id);
        if (!route.model) {
            route.model = new route.collection.model({id: id});
            promise.then(route.model.fetch());
        }
    }

    function isSpeakersDefined(route) {
        return !!route.model.get('speakers');
    }

    function linkWithEvent(speakers, route) {
        speakers.url = route.model.url() + speakers.url;
    }

    function defineSpeakers(route) {
        var speakers     = new SpeakerCollection();
        linkWithEvent(speakers, route);
        route.model.set('speakers', speakers);
    }

    function fetchSpeakers(route, promise) {
        if (isSpeakersDefined(route)) {
            defineSpeakers(route);
            promise.then(route.model.get('speakers').fetch());
        }
    }
});