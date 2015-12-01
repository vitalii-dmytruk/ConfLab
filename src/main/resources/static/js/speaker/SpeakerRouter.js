define([
    'common/Router',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/create/CreateSpeakerRoute',
    'speaker/edit/EditSpeakerRoute',
    'speaker/show/ShowSpeakerRoute',
    'backbone.marionette'
], function (Router, Radio, SpeakerCollection, SpeakerTableRoute, CreateSpeakerRoute, EditSpeakerRoute, ShowSpeakerRoute) {

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
            'speakers/new': create,
            'speakers/:id': show,
            'speakers/:id/edit': edit
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

    function show(){
        return new ShowSpeakerRoute({
            container : this.container,
            collection: this.collection
        });
    }

    function edit(){
        return new EditSpeakerRoute({
            container : this.container,
            collection: this.collection
        });
    }

});
