define([
    'common/view/ItemViewFactory',
    'text!event/table/EventRowTemplate.html',
    'text!event/details/EventTemplate.html',
    'text!event/details/EventEditTemplate.html'
], function (ItemViewFactory, EventRowTemplate, EventTemplate, EventEditTemplate) {

    'use strict';

    var bindings = {
        '#name'       : 'name',
        '#description': 'description',
        '#startDate'  : 'startDate',
        '#endDate'    : 'endDate'
    };
    return new ItemViewFactory({
        title     : 'Conference',
        tableTitle: 'Conferences',

        itemRowTemplate : EventRowTemplate,
        itemShowTemplate: EventTemplate,
        itemEditTemplate: EventEditTemplate,

        showBindings: bindings,
        editBindings: bindings,

        rowBindings: {
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        }
    });
});
