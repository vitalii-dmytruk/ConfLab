define([
    'common/view/ItemViewFactory',
    'text!event/table/EventRowTemplate.html',
    'text!event/details/EventTemplate.html',
    'text!event/details/EventEditTemplate.html'
], function (ItemViewFactory, EventRowTemplate, EventTemplate, EventEditTemplate) {

    'use strict';

    return new ItemViewFactory({
        title     : 'Conference',
        tableTitle: 'Conferences',

        itemRowTemplate : EventRowTemplate,
        itemShowTemplate: EventTemplate,
        itemEditTemplate: EventEditTemplate,

        bindings: {
            '#name'       : 'name',
            '#description': 'description',
            '#startDate'  : 'startDate',
            '#endDate'    : 'endDate'
        },

        rowBindings: {
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        }
    });
});
