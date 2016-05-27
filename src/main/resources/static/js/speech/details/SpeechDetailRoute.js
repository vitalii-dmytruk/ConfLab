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
        itemModelClass       : SpeechModel,
        collectionClass      : SpeakerCollection,
        itemDetailsView      : SpeechDetailsLayoutView,
        attachedItemTableView: speakerViewFactory.itemTableView
    });
});