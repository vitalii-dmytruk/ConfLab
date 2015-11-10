define([
    'backbone.marionette',
    'text!profile/ProfileLayoutTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),
        regions : {
            userSummary      : '[data-user-summary-region]',
            userQuestionnaire: '[data-user-questionnaire-region]',
            userAttributes   : '[data-user-attributes-region]'
        }

    });
});