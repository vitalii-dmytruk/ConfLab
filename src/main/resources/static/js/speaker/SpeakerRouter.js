define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/edit/CreateSpeakerRoute',
    'speaker/edit/EditSpeakerRoute',
    'speaker/show/ShowSpeakerRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, SpeakerCollection, SpeakerTableRoute, CreateSpeakerRoute, EditSpeakerRoute,
             ShowSpeakerRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: {
            name: 'Speakers',
            path: 'speakers'
        },

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new SpeakerCollection();
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
