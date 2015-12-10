define([
    'common/Router',
    'backbone.radio',
    'conference/event/EventCollection',
    'conference/event/table/EventTableRoute',
    'conference/event/create/CreateEventRoute',
    'conference/event/edit/EditEventRoute',
    'conference/event/show/ShowEventRoute',
    'backbone.marionette'
], function (Router, Radio, EventCollection, EventTableRoute, CreateEventRoute, EditEventRoute,
             ShowEventRoute) {

    'use strict';

    return Router.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new EventCollection();
            initMenuButton();
        },

        onBeforeEnter: function () {
            Radio.channel('menu').request('activate', {path: 'conferences'});
        },

        routes: {
            'events'         : getRoute(EventTableRoute),
            'events/new'     : getRoute(CreateEventRoute),
            'events/:id'     : getRoute(ShowEventRoute),
            'events/:id/edit': getRoute(EditEventRoute)
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
        Radio.channel('menu').request('add', {name: 'Conferences', path: 'events'});
    }

    function removeMenuButton() {
        Radio.channel('menu').request('remove', {path: 'events'});
    }

});
