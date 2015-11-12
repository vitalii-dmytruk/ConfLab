define([
    'backbone.marionette',
    'text!speakers/SpeakersLayoutTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),
        regions : {
            userSummary: '[data-news-region]'
        }

    });
});