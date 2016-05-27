define([
    'common/route/ItemDetailsRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechModel',
    'speaker/SpeakerCollection',
    'speech/details/SpeechDetailsLayoutView'
], function (ItemDetailsRoute, speechViewFactory, speakerViewFactory, SpeechModel, SpeakerCollection,
             SpeechDetailsLayoutView) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass : SpeechModel,
        itemDetailsView: SpeechDetailsLayoutView,

        attachedCollectionTitle: 'Speakers',
        attachedRowView        : speakerViewFactory.itemRowView,
        collectionClass        : SpeakerCollection
    });
});