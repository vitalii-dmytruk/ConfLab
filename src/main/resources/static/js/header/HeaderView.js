define([
    'text!header/HeaderTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({
        template : _.template(template),
        className: 'container-fluid',

        regions: {
            accountMenu: '#account-menu-region'
        }

    });

});
