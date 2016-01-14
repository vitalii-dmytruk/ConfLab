define([
    'common/view/ItemViewFactory',
    'text!event/table/EventRowTemplate.html',
    'text!event/details/EventTemplate.html',
    'text!event/details/EventEditTemplate.html',
    'bootstrap.datepicker'
], function (ItemViewFactory, EventRowTemplate, EventTemplate, EventEditTemplate) {

    'use strict';

    return new ItemViewFactory({
        title     : 'Conference',
        tableTitle: 'Conferences',

        itemRowTemplate : EventRowTemplate,
        itemShowTemplate: EventTemplate,
        itemEditTemplate: EventEditTemplate,

        showBindings: {
            '#name'       : 'name',
            '#description': 'description',
            '#startDate'  : 'startDate',
            '#endDate'    : 'endDate'
        },
        editBindings: {
            '#name'       : 'name',
            '#description': 'description',
            '#startDate'  : dateBinding('startDate'),
            '#endDate'    : dateBinding('endDate')
        },

        rowBindings: {
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        }
    });

    function dateBinding(attribute) {
        return {
            observe   : attribute,
            initialize: function ($el) {
                $el.datepicker({
                    format: 'dd-M-yyyy'
                });
                $el.on('hide', function(){
                    $el.change();
                });
            }
        }
    }
});
