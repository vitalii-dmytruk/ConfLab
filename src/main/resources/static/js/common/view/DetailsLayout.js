define([
    'text!common/view/DetailsTemplate.html',
    'backbone.marionette'
], function DetailsLayout(tempalte) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(tempalte),

        regions: {
            content   : '[data-content-region]',
            attachment: '[data-attachment-region]'
        }
    });
});