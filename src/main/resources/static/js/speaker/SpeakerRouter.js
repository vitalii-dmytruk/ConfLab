define([
    'common/Router',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/edit/CreateSpeakerRoute',
    'backbone.marionette'
], function (Router, Radio, SpeakerCollection, SpeakerTableRoute, CreateSpeakerRoute) {

    'use strict';

    //noinspection JSUnusedGlobalSymbols
    return Router.extend({
        initialize: function (options) {
            this.container  = options.container;
            this.collection = new SpeakerCollection();
            Radio.channel('menu').request('add', {name: 'Speakers', path: 'speakers'});
        },

        onBeforeEnter: function () {
            Radio.channel('menu').request('activate', {path: 'speakers'});
        },

        routes: {
            'speakers'    : showSpeakerTable,
            'speakers/new': create
        }

    });

    function showSpeakerTable() {
        return new SpeakerTableRoute({
            container : this.container,
            collection: this.collection
        });
    }

    function create() {
        return new CreateSpeakerRoute({
            container : this.container,
            collection: this.collection
        });

    }

});
