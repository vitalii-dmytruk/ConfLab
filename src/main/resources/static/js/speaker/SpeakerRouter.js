define([
    'common/Router',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/edit/CreateSpeakerRoute',
    'speaker/edit/EditSpeakerRoute',
    'speaker/show/ShowSpeakerRoute',
    'backbone.marionette'
], function (Router, Radio, SpeakerCollection, SpeakerTableRoute, CreateSpeakerRoute, EditSpeakerRoute,
             ShowSpeakerRoute) {

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
            'speakers'         : getRoute(SpeakerTableRoute),
            'speakers/new'     : getRoute(CreateSpeakerRoute),
            'speakers/:id'     : getRoute(ShowSpeakerRoute),
            'speakers/:id/edit': getRoute(EditSpeakerRoute)
        }

    });

    function getRoute(RouteClass) {
        return function () {
            return new RouteClass({
                container : this.container,
                collection: this.collection
            });
        }
    }

});
