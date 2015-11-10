define([
    'backbone.marionette',
    'menu/MenuItemView'
], function (Marionette, MenuItemView) {

    'use strict';

    return Marionette.CollectionView.extend({
        tagName  : 'ul',
        className: 'nav nav-sidebar',
        childView: MenuItemView
    });

});
