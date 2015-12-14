define([
    'common/Service',
    'menu/MenuItems',
    'menu/MenuView'
], function (Service, MenuItems, MenuView) {

    'use strict';

    //noinspection JSUnusedGlobalSymbols
    return Service.extend({

        channelName: 'menu',

        initialize: function (options) {
            this.container  = options.container;
            this.collection = new MenuItems();
            this.start();
        },

        onStart: function () {
            this.view = new MenuView({collection: this.collection});
            this.container.show(this.view);
            this.channel.reply({
                add     : addToCollection,
                activate: setActiveItem,
                remove  : removeFromCollection
            }, this)
        },

        onStop: function () {
            this.channel.reset();
        }
    });

    function removeFromCollection(button) {
        var model = findModelByPath(this.collection, button.path);
        this.collection.remove(model);
    }

    function setActiveItem(button) {
        var model;

        this.collection.invoke('set', 'active', false);
        model = findModelByPath(this.collection, button.path);
        if (model) {
            model.set('active', true);
        }
    }

    function addToCollection(model) {
        this.collection.add(model);
    }

    function findModelByPath(collection, path) {
        return collection.findWhere({path: path});
    }
});
