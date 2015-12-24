define([
    'common/navigation/NavigationItemView',
    'common/navigation/NavigationCollection',
    'backbone.marionette'
], function (MenuItemView, NavigationCollection) {

    'use strict';

    return Marionette.CollectionView.extend({
        tagName   : 'ul',
        childView : MenuItemView,
        collection: new NavigationCollection(),

        add: function (menuItem) {
            this.collection.add(menuItem);
        },

        remove: function (menuItem) {
            var toRemove = findModelByPath(this.collection, menuItem.path);
            this.collection.remove(toRemove);
        },

        activate: function (menuItem) {
            var toActivate = findModelByPath(this.collection, menuItem.path);

            this.collection.invoke('set', 'active', false);
            toActivate && toActivate.set('active', true);
        }

    });

    function findModelByPath(collection, path) {
        return collection.findWhere({path: path});
    }
});
