define([
    'common/ListController',
    'event/eventViewFactory',
    'event/EventCollection'
], function (ListController, eventViewFactory, EventCollection) {

    'use strict';

    return ListController.extend({
        collectionClass: EventCollection,

        title   : 'Conferences',
        rowView : eventViewFactory.itemRowView,
        EditView: eventViewFactory.itemEditView
    });
});