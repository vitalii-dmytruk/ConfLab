define([
    'common/navigation/NavigationView',
    'event/details/EventListedItemView'
], function EventItemListView(NavigationView, EventListedItemView) {

    'use strict';

    return NavigationView.extend({
        childView: EventListedItemView,
        className: 'nav nav-pills nav-stacked',

        childEvents: {
            'item:clicked': selectItem
        },

        collectionEvents: {
            'remove': updateSelection
        },

        onRenderCollection: selectFirstItem
    });

    function selectItem(view) {
        var item = view.model;
        this.activateItem(item);
    }

    function selectFirstItem(view) {
        var firstItem;
        firstItem = view.collection.first();
        if (firstItem) {
            view.activateItem(firstItem);
        } else {
            view.deactivateItem();
            view.previousActive = undefined;
        }
    }

    function updateSelection(model) {
        if (this.previousActive.model.get('id') === model.get('id')) {
            selectFirstItem(this);
        }
    }
});