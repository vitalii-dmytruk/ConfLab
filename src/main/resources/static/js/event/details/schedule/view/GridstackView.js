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

        getSnapshot: function () {
            var selector = '.grid-stack-' + this.options.width + ' .grid-stack-item:visible';
            var filtered = _.filter($(selector), function (el) {
                return $(el).data('_gridstack_node');
            });
            var res      = _.map(filtered, function (el) {
                el       = $(el);
                var node = $(el).data('_gridstack_node');
                return {
                    id    : el.attr('data-gs-id'),
                    x     : node.x,
                    y     : node.y,
                    width : node.width,
                    height: node.height
                };
            });
            console.log(JSON.stringify(res));
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