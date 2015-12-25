define([
    'common/behavior/ItemActionIconsBehavior',
    'backbone.marionette'
], function (ItemActionIcons) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName  : 'a',
        className: 'list-group-item',

        behaviors: {
            actions: {
                behaviorClass: ItemActionIcons
            }
        },

        attributes: function () {
            return {
                href: '#' + this.model.url()
            };
        },

        onRender: function () {
            this.stickit();
        }
    });
});
