define([
    'text!conference/event/table/EventRowTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        tagName   : 'a',
        className : 'list-group-item',
        attributes: function () {
            return {
                href: '#events/' + this.model.get('id')
            };
        },

        bindings: {
            '[data-event-name]'     : 'name',
            '[data-event-date-from]': 'dateFrom',
            '[data-event-date-to]'  : 'dateTo'
        },

        onRender: function () {
            this.stickit();
        }
    });
});
