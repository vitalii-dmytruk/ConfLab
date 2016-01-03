define([
    'common/route/ItemDetailsRoute',
    'speech/speechViewFactory',
    'speaker/speakerViewFactory',
    'speech/SpeechModel',
    'speaker/SpeakerCollection'
], function (ItemDetailsRoute, speechViewFactory, speakerViewFactory, SpeechModel, SpeakerCollection) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass       : SpeechModel,
        collectionClass      : SpeakerCollection,
        itemDetailsView      : speechViewFactory.itemDetailsView,
        attachedItemTableView: speakerViewFactory.attachedItemTableView
    });
});