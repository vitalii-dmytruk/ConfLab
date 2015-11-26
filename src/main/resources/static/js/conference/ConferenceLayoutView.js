define([
    'backbone.marionette',
    'text!conference/ConferenceLayoutTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),
        regions : {
            speakers: '[data-speakers-region]'
        }

    });
});