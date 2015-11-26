define([
   'text!speaker/SpeakerPageTemplate.html',
   'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({
        template: _.template(template),
        regions : {
            table : '[data-table-region]',
            form  : '[data-form-region]'
        }
    });
});