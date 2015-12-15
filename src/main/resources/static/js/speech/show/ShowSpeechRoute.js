define([
    'common/Route',
    'speech/show/ShowSpeechView',
    'speaker/SpeakerCollection'
], function (Route, ShowSpeechView, SpeakersCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function (id) {
            var promise = $.Deferred().resolve();
            this.model = this.collection.get(id);

            checkModelAvailability(this, id, promise);
            checkSpeakersAvailability(this, promise);

            return promise;
        },

        render: function () {
            this.view = new ShowSpeechView({
                model: this.model
            });
            this.container.show(this.view);
        }
    });

    function fetchSpeakers() {
        var speakers = this.model.get('speakers');
        return speakers.fetch();
    }

    function addSpeakers(route) {
        var speakers     = new SpeakersCollection();
        speakers.url = route.model.url() + '/speakers';
        route.model.set('speakers', speakers);
    }

    function checkModelAvailability(route, id, promise) {
        if (!route.model) {
            route.model = new route.collection.model({id: id});
            promise.then(route.model.fetch());
        }
    }

    function checkSpeakersAvailability(route, promise) {
        if (!route.model.get('speakers')) {
            addSpeakers(route);
            promise.then(fetchSpeakers.bind(route));
        }
    }

});