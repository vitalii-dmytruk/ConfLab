define([
    'text!event/details/schedule/template/GridstackTemplate.html',
    'backbone.marionette',
    'gridstack',
    'jquery-ui/droppable'
], function GridstackView(template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        ui: {
            gridstack: '.grid-stack',
            items    : '.grid-stack-item'
        },

        events: {
            'change @ui.gridstack': function (event, items) {
                //TODO workaround cause triggers doesn't work.
                this.triggerMethod('gridstack:change', event, items);
            },
            'added @ui.gridstack' : function (events, items) {
                this.triggerMethod('gridstack:added', events, items);
            }
        },

        onShow: onShow,

        addWidget: addWidget
    });

    function onShow() {
        this.ui.gridstack.addClass('grid-stack-' + this.options.width);

        this.ui.gridstack.gridstack(_.defaults({
            acceptWidgets: '.grid-stack-item'
        }, this.options));
    }

    function addWidget() {
        var gridstack = this.ui.gridstack.data('gridstack');
        gridstack.addWidget.apply(gridstack, arguments);
    }
});