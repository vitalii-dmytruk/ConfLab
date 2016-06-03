define([
    'common/ListController',
    'speaker/speakerViewFactory',
    'speaker/SpeakerCollection'
], function (ListController, speakerViewFactory, SpeakerCollection) {

    'use strict';

    return ListController.extend({
        collectionClass: SpeakerCollection,

        title   : 'Speakers',
        rowView : speakerViewFactory.itemRowView,
        EditView: speakerViewFactory.itemEditView
    });
});