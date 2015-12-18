define([
    'common/route/ItemDetailsRoute',
    'speaker/speakerViewFactory',
    'speech/speechViewFactory',
    'speaker/SpeakerModel',
    'speech/SpeechCollection'
], function (ItemDetailsRoute, speakerViewFactory, speechViewFactory, SpeakerModel, SpeechCollection) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass             : SpeakerModel,
        attachedItemCollectionClass: SpeechCollection,
        itemDetailsView            : speakerViewFactory.itemDetailsView,
        attachedItemTableView      : speechViewFactory.attachedItemTableView
    });
});