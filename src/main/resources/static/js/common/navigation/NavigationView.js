define([
    'common/navigation/NavigationItemView',
    'backbone.marionette'
], function (NavigationItemView) {

    'use strict';

    return Marionette.CollectionView.extend({
        tagName  : 'ul',
        childView: NavigationItemView,

        collectionEvents: {
            'remove': refreshPreviousActive
        },

        constructor: function (options) {
            if (!options.collection) {
                this.collection = new Backbone.Collection();
            }
            Marionette.CollectionView.apply(this, arguments);
        },

        addItems: function (menuItems) {
            this.collection.add(menuItems);
        },

        removeItem: function (menuItem) {
            this.collection.remove(menuItem);
        },

        resetItems: function (menuItems) {
            this.collection.reset(menuItems);
        },

        deactivateItem: function () {
            this.previousActive && this.previousActive.deactivate();
        },

        activateItem: function (menuItem) {
            if (menuItem) {
                this.deactivateItem();
                this.previousActive = this.children.findByModel(menuItem);
            }
            if (this.previousActive) {
                this.previousActive.activate();
                return this.previousActive;
            }

        }
    });

    function refreshPreviousActive(model) {
        var activeView, isActiveViewDeleted;

        activeView          = this.previousActive;
        isActiveViewDeleted = activeView && model.get('id') == activeView.model.get('id');
        if (isActiveViewDeleted) {
            this.previousActive.deactivate();
            this.previousActive = undefined;
            this.triggerMethod('activeItemDeleted');
        }
    }
});
