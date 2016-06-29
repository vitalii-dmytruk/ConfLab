define([
    'text!event/details/schedule/template/RowAxisTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function RowAxisView(template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        className: 'row-axis',

        attributes: function () {
            var index  = this.options.index,
                height = this.options.cellHeight + this.options.cellMargin,
                offset = index * height;

            return {
                style: 'top: ' + offset + 'px; ' + 'height: ' + this.options.cellHeight + 'px;'
            };
        },

        bindings: {
            '[data-time]': {
                observe: 'time',
                onGet  : function (val) {
                    return dateFormatter(val.getHours()) + ':' + dateFormatter(val.getMinutes());
                }
            }
        },

        onRender: function () {
            this.stickit();
        }
    });

    function dateFormatter(val) {
        return val < 10 ? '0' + val : val;
    }
});