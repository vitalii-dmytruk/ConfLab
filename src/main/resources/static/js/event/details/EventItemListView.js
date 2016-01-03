define([
    'common/navigation/NavigationView',
    'event/details/EventListedItemView'
], function EventComponentListView(NavigationView, EventListedItemView) {
    //noinspection JSUnusedGlobalSymbols
    return NavigationView.extend({
        childView: EventListedItemView,
        className: 'nav nav-pills nav-stacked',

        childEvents: {
            'item:clicked': selectItem
        },

        onRenderCollection: function () {
            selectItem.call(this, this.children.first());
        }
    });

    function selectItem(view) {
        var item = view.model;
        this.activateItem(item);
    }
});