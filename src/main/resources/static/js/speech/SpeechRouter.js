define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'speech/SpeechCollection',
    'speech/table/SpeechTableRoute',
    'speech/create/CreateSpeechRoute',
    'speech/edit/EditSpeechRoute',
    'speech/show/ShowSpeechRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, SpeechCollection, SpeechTableRoute, CreateSpeechRoute, EditSpeechRoute,
             ShowSpeechRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Speeches',
            path: 'speeches'
        },

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new SpeechCollection();
        },

        routes: {
            'speeches'         : getRoute(SpeechTableRoute),
            'speeches/new'     : getRoute(CreateSpeechRoute),
            'speeches/:id'     : getRoute(ShowSpeechRoute),
            'speeches/:id/edit': getRoute(EditSpeechRoute)
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
