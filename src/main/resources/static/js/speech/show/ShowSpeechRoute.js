define([
    'common/Route',
    'speech/show/ShowSpeechView',
    'speaker/SpeakerCollection'
], function (Route, ShowSpeechView, SpeakersCollection) {

    'use strict';

    function fetchSpeakers() {
        this.speakers.url = this.model.url() + '/speakers';
        return this.speakers.fetch();
    }

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
            this.speakers   = new SpeakersCollection();
        },

        fetch: function (id) {
            this.model = this.collection.get(id);
            if (!this.model) {
                this.model = new this.collection.model({id: id});
                return this.model.fetch().then(fetchSpeakers.bind(this));
            }
        },

        render: function () {
            this.view = new ShowSpeechView({
                model: this.model,
                collection : this.speakers
            });
            this.container.show(this.view);
        }
    });
});