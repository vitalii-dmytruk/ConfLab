define([
    'text!event/details/schedule/EventScheduleTemplate.html',
    'gridstack',
    'backbone.marionette'
], function EventScheduleView(template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            grid: '.grid-stack'
        },

        onShow: function () {
            var options = {
                cellHeight    : 50,
                verticalMargin: 10,
                float         : true
            };
            this.ui.grid.addClass('grid-stack-' + this.options.tracks.length);
            this.ui.grid.gridstack(options);
        }
    });

});
