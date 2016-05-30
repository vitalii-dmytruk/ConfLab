define([
    'common/route/ItemDetailsRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechModel',
    'speaker/SpeakerCollection',
    'speech/details/SpeechShowView'
], function (ItemDetailsRoute, speechViewFactory, speakerViewFactory, SpeechModel, SpeakerCollection,
             SpeechShowView) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass : SpeechModel,
        itemDetailsView: SpeechShowView,

        attachedCollectionTitle: 'Speakers',
        attachedRowView        : speakerViewFactory.itemRowView,
        collectionClass        : SpeakerCollection
    });
});