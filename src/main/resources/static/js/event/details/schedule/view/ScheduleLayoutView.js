define([
    'text!event/details/schedule/template/ScheduleLayoutTemplate.html',
    'backbone.marionette'
], function ScheduleLayoutView(template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            'saveBtn': '.btn-primary'
        },

        triggers: {
            'click @ui.saveBtn': 'schedule:save'
        },

        regions: {
            days    : '[data-schedule-days]',
            speeches: '[data-schedule-speeches]',
            schedule: '[data-schedule]'
        }
    });
});