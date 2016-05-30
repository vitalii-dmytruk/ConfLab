define([
    'common/route/ItemDetailsRoute',
    'speaker/speakerViewFactory',
    'speech/SpeechModel',
    'speaker/SpeakerCollection',
    'speech/details/SpeechShowView'
], function (ItemDetailsRoute, speakerViewFactory, SpeechModel, SpeakerCollection, SpeechShowView) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass : SpeechModel,
        itemDetailsView: SpeechShowView,

        attachedCollectionTitle: 'Speakers',
        attachedRowView        : speakerViewFactory.itemRowView,
        collectionClass        : SpeakerCollection
    });
});