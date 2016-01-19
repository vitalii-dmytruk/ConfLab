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

        showBindings: viewBindings(directBind),
        editBindings: viewBindings(dateBinding),

        rowBindings: {
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        }
    });


    function viewBindings(dateBinder) {
        return {
            '#name'        : 'name',
            '#description' : 'description',
            '#eventCountry': 'country',
            '#eventCity'   : 'city',
            '#eventAddress': 'address',
            '#startDate'   : dateBinder('startDate'),
            '#endDate'     : dateBinder('endDate')
        }
    }

    function directBind(attribute) {
        return attribute;
    }

    function dateBinding(attribute) {
        return {
            observe   : attribute,
            initialize: function ($el) {
                $el.datepicker({
                    format     : 'dd-M-yyyy',
                    orientation: 'bottom'
                });
                $el.on('hide', function () {
                    $el.change();
                });
            }
        }
    }
});
