define([
    'common/MenuAwareRouter',
    'backbone.radio',
    'speaker/SpeakerCollection',
    'speaker/table/SpeakerTableRoute',
    'speaker/show/ShowSpeakerRoute',
    'backbone.marionette'
], function (MenuAwareRouter, Radio, SpeakerCollection, SpeakerTableRoute, ShowSpeakerRoute) {

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
            'speakers'    : getRoute(SpeakerTableRoute),
            'speakers/:id': getRoute(ShowSpeakerRoute)
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
