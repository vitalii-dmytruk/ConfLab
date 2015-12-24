define([
    'common/navigation/NavigationItemView',
    'common/navigation/NavigationCollection',
    'backbone.marionette'
], function (MenuItemView, NavigationCollection) {

    'use strict';

    return Marionette.CollectionView.extend({
        tagName  : 'ul',
        childView: MenuItemView,

        constructor: function () {
            Marionette.CollectionView.apply(this, arguments);
            this.collection = new NavigationCollection();
        },

        addItems: function (menuItems) {
            this.collection.add(menuItems);
        },

        removeItem: function (menuItem) {
            var toRemove = findModelByPath(this.collection, menuItem.path);
            this.collection.remove(toRemove);
        },

        resetItems: function (menuItems) {
            this.collection.reset(menuItems);
        },

        activateItem: function (menuItem) {
            var toActivate = findModelByPath(this.collection, menuItem.path);

            this.collection.invoke('set', 'active', false);
            toActivate && toActivate.set('active', true);
        }

    });

    function findModelByPath(collection, path) {
        return collection.findWhere({path: path});
    }
});
