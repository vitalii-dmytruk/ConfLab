define([
    'common/Service',
    'menu/MenuItems',
    'menu/MenuView'
], function (Service, MenuItems, MenuView) {

    'use strict';

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
                add     : this.onAdd,
                activate: this.onActivate,
                remove  : this.onRemove
            }, this)
        },

        onStop: function () {
            this.channel.reset();
        },

        onAdd: function (model) {
            this.collection.add(model);
        },

        onRemove: function (model) {
            model = this.collection.findWhere(model);
            this.collection.remove(model);
        },

        onActivate: function (model) {
            this.collection.invoke('set', 'active', false);
            model = this.collection.findWhere(model);
            if (model) {
                model.set('active', true);
            }
        }

    });

});
