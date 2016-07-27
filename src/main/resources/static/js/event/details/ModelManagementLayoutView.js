define([
    'text!event/details/ModelManagementLayoutTemplate.html',
    'backbone.marionette'
], function ModelManagementLayoutView(template) {

    'use strict';

    return Marionette.LayoutView.extend({
        template : _.template(template),
        className: 'row',

        ui: {
            newBtn: '#new-button'
        },

        triggers: {
            'click @ui.newBtn': 'create:new'
        },

        regions: {
            searchItemRegion : '[data-search-item-region]',
            itemsListRegion  : '[data-items-list-region]',
            currentItemRegion: '[data-current-item-region]'
        }
    });

});