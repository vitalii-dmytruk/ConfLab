define([
    'backbone.marionette',
    'gridstack',
    'jquery-ui/droppable'
], function GridstackView() {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template('<div data-gridstack></div>'),

        ui: {
            gridstack: '[data-gridstack]',
            items    : '.grid-stack-item'
        },

        events: {
            'change @ui.gridstack': function (event, items) {
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
        this.ui.gridstack.gridstack(_.defaults({
            acceptWidgets: '.grid-stack-item'
        }, this.options));
    }

    function addWidget(options) {
        var gridstack = this.ui.gridstack.data('gridstack');
        gridstack.addWidget(options.el, options.column, options.position, options.width, options.height,
                            undefined, undefined, undefined, undefined, undefined, options.id);
    }
});