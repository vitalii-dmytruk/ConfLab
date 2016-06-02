define([
    'common/route/ItemTableRoute',
    'event/eventViewFactory',
    'event/EventCollection'
], function (ItemTableRoute, eventViewFactory, EventCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: EventCollection,

        title   : 'Conferences',
        rowView : eventViewFactory.itemRowView,
        EditView: eventViewFactory.itemEditView
    });
});