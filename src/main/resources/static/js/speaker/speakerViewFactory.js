define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'speech/SpeechCollection',
    'partner/PartnerCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (CollectionBinding, ViewFactory, SpeechCollection, CompanyCollection, SpeakerRowTemplate,
    SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    return new ViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute  : 'name',
        attachedCollectionType: SpeechCollection,

        editBindings: viewBindings(companySelectBinder),
        showBindings: viewBindings(companyNameBinder),

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }
    });

    function viewBindings(companyBinder) {
        return {
            '#email'   : {
                attributes: [{
                    name   : 'href',
                    observe: 'email',
                    onGet  : function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe   : 'email'
            },
            '#name'    : 'name',
            '#position': 'position',
            '#company' : companyBinder(),
            '#about'   : 'about'
        };
    }

    function companySelectBinder(){
        return new CollectionBinding(CompanyCollection, 'company', true);
    }

    function companyNameBinder() {
        return {
            observe: 'company',
            onGet  : function (value) {
                return value && value.name;
            }
        }
    }
});
