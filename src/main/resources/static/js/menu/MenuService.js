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

    function removeFromCollection(model) {
        var index = this.collection.findWhere(model);
        this.collection.remove(index);
    }

    function setActiveItem(model) {
        this.collection.invoke('set', 'active', false);
        model = this.collection.findWhere(model);
        if (model) {
            model.set('active', true);
        }
    }

    function addToCollection(model) {
        this.collection.add(model);
    }
});
