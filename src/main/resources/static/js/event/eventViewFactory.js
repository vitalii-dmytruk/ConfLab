define([
    'common/view/ItemViewFactory',
    'text!event/table/EventRowTemplate.html',
    'text!event/details/EventTemplate.html',
    'text!event/details/EventEditTemplate.html',
    'bootstrap.datepicker'
], function (ItemViewFactory, EventRowTemplate, EventTemplate, EventEditTemplate) {

    'use strict';

    return new ItemViewFactory({
        title       : 'Conference',
        tableTitle  : 'Conferences',
        rowItemClass: 'event-row-item',

        itemRowTemplate : EventRowTemplate,
        itemShowTemplate: EventTemplate,
        itemEditTemplate: EventEditTemplate,

        showBindings: viewBindings(directBind, contactsBinder),
        editBindings: viewBindings(dateBinding, directBind),

        rowBindings: {
            '[data-event-name]'      : 'name',
            '[data-event-start-date]': 'startDate',
            '[data-event-end-date]'  : 'endDate'
        }
    });


    function viewBindings(dateBinder, contactsBinder) {
        return {
            '#name'         : 'name',
            '#description'  : 'description',
            '#eventCountry' : 'country',
            '#eventCity'    : 'city',
            '#eventAddress' : 'address',
            '#eventContacts': contactsBinder('contacts'),
            '#startDate'    : dateBinder('startDate'),
            '#endDate'      : dateBinder('endDate')
        }
    }

    function directBind(attribute) {
        return attribute;
    }

    function contactsBinder(attr) {
        return {
            observe     : attr,
            updateMethod: 'html',
            onGet       : function (value) {
                return value && value.replace(/\n/g, '<br/>');
            }
        }
    }

    function dateBinding(attribute) {
        return {
            observe   : attribute,
            initialize: function ($el) {
                $el.datepicker({
                    format     : 'dd-M-yyyy',
                    orientation: 'bottom',
                    autoclose: true
                });
                $el.on('hide', function () {
                    $el.change();
                });
            }
        }
    }
});
