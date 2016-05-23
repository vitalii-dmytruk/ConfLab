define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'text!track/details/TrackShowTemplate.html',
    'text!track/details/TrackEditTemplate.html'
], function (CollectionBinding, EventItemViewFactory, TrackShowTemplate,TrackEditTemplate) {

    'use strict';

    return new EventItemViewFactory({
        title     : 'Track',
        tableTitle: 'Tracks',

        //TODO
        itemRowTemplate : "MOCK",
        itemShowTemplate: TrackShowTemplate,
        itemEditTemplate: TrackEditTemplate,

        searchLabelAttribute: 'name',

        showBindings: {
            '#name'    : 'name',
            '#capacity': 'capacity'
        },

        editBindings: {
            '#name'    : 'name',
            '#capacity': 'capacity'
        },

        rowBindings: {}
    });
});