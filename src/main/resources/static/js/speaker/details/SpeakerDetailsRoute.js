define([
    'common/route/ItemDetailsRoute',
    'speaker/speakerViewFactory',
    'speech/speechViewFactory',
    'speaker/SpeakerModel',
    'speech/SpeechCollection'
], function (ItemDetailsRoute, speakerViewFactory, speechViewFactory, SpeakerModel, SpeechCollection) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass : SpeakerModel,
        itemDetailsView: speakerViewFactory.itemDetailsView,

        attachedCollectionTitle: 'Speeches',
        attachedRowView        : speechViewFactory.itemRowView,
        collectionClass        : SpeechCollection
    });
});