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
            this.model = this.collection.get(id);
            if (!this.model) {
                createModel(this, id);
                return this.model.fetch().then(fetchSpeakers.bind(this));
            }
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

    function createModel(route, id) {
        var speakers;

        route.model = new route.collection.model({id: id});
        speakers    = new SpeakersCollection();
        speakers.url = route.model.url() + '/speakers';
        route.model.set('speakers', speakers);
    }
});