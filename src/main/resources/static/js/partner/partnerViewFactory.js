define([
    'event/details/EventItemViewFactory',
    'text!partner/table/PartnerRowTemplate.html',
    'text!partner/details/PartnerTemplate.html',
    'text!partner/details/PartnerEditTemplate.html'
], function (ViewFactory, PartnerRowTemplate, PartnerShowTemplate, PartnerEditTemplate) {

    'use strict';

    return new ViewFactory({
        tableTitle: 'Partners',

        itemRowTemplate : PartnerRowTemplate,
        itemShowTemplate: PartnerShowTemplate,
        itemEditTemplate: PartnerEditTemplate,

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
            '[data-partner-name]': 'name'
        }
    });
});