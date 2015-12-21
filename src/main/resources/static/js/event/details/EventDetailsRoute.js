define([
   'common/route/ItemDetailsRoute',
   'event/eventViewFactory',
   'speech/speechViewFactory',
   'speaker/speakerViewFactory',
   'event/EventModel',
   'speaker/SpeakerCollection'
], function (ItemDetailsRoute, eventViewFactory, speechViewFactory, speakerViewFactory,  EventModel, SpeakerCollection) {

    'use strict';

    return ItemDetailsRoute.extend({
        itemModelClass             : EventModel,
        attachedItemCollectionClass: SpeakerCollection,
        itemDetailsView            : eventViewFactory.itemDetailsView,
        attachedItemTableView      : speakerViewFactory.attachedItemTableView
    });
});