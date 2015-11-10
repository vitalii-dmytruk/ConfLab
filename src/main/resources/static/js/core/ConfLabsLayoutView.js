define([
    'backbone.marionette',
    'text!core/ConfLabsLayoutTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.LayoutView.extend({

        el      : 'body',
        template: _.template(template),
        regions : {
            header: '[data-header-region]',
            menu  : '[data-menu-region]',
            main  : '[data-main-region]',
            footer: '[data-footer-region]'
        }

    });
});