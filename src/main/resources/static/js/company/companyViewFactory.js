define([
    'event/details/EventItemViewFactory',
    'text!company/table/CompanyRowTemplate.html',
    'text!company/details/CompanyTemplate.html',
    'text!company/details/CompanyEditTemplate.html'
], function (ViewFactory, CompanyRowTemplate, CompanyShowTemplate, CompanyEditTemplate) {

    'use strict';

    return new ViewFactory({
        tableTitle: 'Companies',

        itemRowTemplate : CompanyRowTemplate,
        itemShowTemplate: CompanyShowTemplate,
        itemEditTemplate: CompanyEditTemplate,

        searchLabelAttribute: 'name',

        showBindings: {
            '#name': 'name',
            '#url' : {
                observe   : 'url',
                attributes: [{
                    name   : 'href',
                    observe: 'url'
                }]
            }
        },

        editBindings: {
            '#name': 'name',
            '#url' : 'url'
        },

        rowBindings: {
            '[data-company-name]': 'name'
        }
    });
});