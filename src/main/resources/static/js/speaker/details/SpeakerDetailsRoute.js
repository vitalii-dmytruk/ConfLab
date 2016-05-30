define([
    'common/route/ItemDetailsRoute',
    'speaker/details/SpeakerShowView',
    'speech/speechViewFactory',
    'speaker/SpeakerModel',
    'speech/SpeechCollection'
], function (ItemDetailsRoute, SpeakerShowView, speechViewFactory, SpeakerModel, SpeechCollection) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass : SpeakerModel,
        itemDetailsView: SpeakerShowView,

        attachedCollectionTitle: 'Speeches',
        attachedRowView        : speechViewFactory.itemRowView,
        collectionClass        : SpeechCollection
    });
});