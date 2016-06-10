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
            gridstack: '.grid-stack'
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