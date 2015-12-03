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
            initMenuButton();
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

    function initMenuButton() {
        var auth = Radio.channel('auth');

        auth.request('isAuthenticated') && addMenuButton();
        auth.on('login', addMenuButton);
        auth.on('logout', removeMenuButton)
    }

    function addMenuButton() {
        Radio.channel('menu').request('add', {name: 'Speakers', path: 'speakers'});
    }

    function removeMenuButton() {
        Radio.channel('menu').request('remove', {path: 'speakers'});
    }

});
