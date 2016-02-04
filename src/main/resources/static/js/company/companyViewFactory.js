define([
    'event/details/EventItemViewFactory',
    'company/details/CompanyEditView',
    'text!company/table/CompanyRowTemplate.html',
    'text!company/details/CompanyTemplate.html',
    'text!company/details/CompanyEditTemplate.html'
], function (ViewFactory, CompanyEditView, CompanyRowTemplate, CompanyShowTemplate, CompanyEditTemplate) {

    'use strict';

    var viewFactory = ViewFactory.extend({
        getEditView: function () {
            return CompanyEditView;
        }
    });

    return new viewFactory({
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
            },
            '#logo': {
                attributes: [{
                    name   : 'src',
                    observe: 'image',
                    onGet : function (value) {
                        return value || '/img/default-logo.jpg';
                    }
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