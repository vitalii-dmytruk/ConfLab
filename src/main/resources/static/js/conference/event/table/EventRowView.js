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
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        },

        onRender: function () {
            this.stickit();
        }
    });
});
