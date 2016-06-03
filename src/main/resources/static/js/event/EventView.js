define([
    'text!event/EventTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        bindings: {
            '#page-title': 'name'
        },

        regions: {
            tabsRegion      : '[data-tabs-region]',
            currentTabRegion: '[data-current-tab-region]'
        },

        onRender: function () {
            this.stickit();
        }
    });

});