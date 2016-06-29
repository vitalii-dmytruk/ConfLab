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
            tracksHeader: '[data-tracks-header]',
            speeches    : '[data-schedule-speeches]',
            schedule    : '[data-schedule]',
            axis        : '[data-grid-axis]'
        }
    });
});