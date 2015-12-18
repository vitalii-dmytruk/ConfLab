define([
    'text!event/show/ShowEventTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        bindings: {
            '[data-event-edit-href]': {
                attributes: [{
                    name   : 'href',
                    observe: 'id',
                    onGet  : function (id) {
                        return '#' + this.model.urlRoot + '/' + id + '/edit';
                    }
                }]
            },
            '[data-event-name]'     : 'name',
            '#event-name'           : 'name',
            '#event-description'    : 'description',
            '#event-start-date'     : 'startDate',
            '#event-end-date'       : 'endDate'
        },

        onRender: function () {
            this.stickit();
        }
    });
});