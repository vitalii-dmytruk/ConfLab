define([
    'text!event/details/schedule/template/ScheduleLayoutTemplate.html',
    'backbone.marionette'
], function ScheduleLayoutView(template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        regions: {
            header  : '[data-schedule-header]',
            speeches: '[data-schedule-speeches]',
            schedule: '[data-schedule]'
        }
    });
});