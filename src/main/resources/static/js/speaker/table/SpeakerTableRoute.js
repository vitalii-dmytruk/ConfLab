define([
    'common/route/ItemTableRoute',
    'speaker/speakerViewFactory',
    'speaker/SpeakerCollection'
], function (ItemTableRoute, speakerViewFactory, SpeakerCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: SpeakerCollection,

        title   : 'Speakers',
        rowView : speakerViewFactory.itemRowView,
        EditView: speakerViewFactory.itemEditView
    });
});