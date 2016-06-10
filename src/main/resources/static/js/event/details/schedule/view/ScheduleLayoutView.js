define([
    'text!event/details/schedule/template/ScheduleLayoutTemplate.html',
    'backbone.marionette'
], function ScheduleLayoutView(template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        regions: {
            tracksHeader: '[data-tracks-header]',
            speeches    : '[data-schedule-speeches]',
            schedule    : '[data-schedule]'
        }
    });
});