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

        onRenderCollection : selectFirstItem,
        onActiveItemDeleted: selectFirstItem
    });

    function selectItem(view) {
        var item = view.model;
        this.activateItem(item);
    }

    function selectFirstItem() {
        var firstItem;
        firstItem = this.collection.first();
        firstItem && this.activateItem(firstItem);
    }
});