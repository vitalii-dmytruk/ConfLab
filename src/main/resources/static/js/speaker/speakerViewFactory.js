define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'speaker/details/SpeakerEditView',
    'company/CompanyCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (CollectionBinding, ViewFactory, SpeakerEditView, CompanyCollection, SpeakerRowTemplate,
    SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    var viewFactory = ViewFactory.extend({
        getEditView: function () {
            return SpeakerEditView;
        }
    });

    return new viewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute: 'name',

        editBindings: viewBindings(companySelectBinder),
        showBindings: _.extend(viewBindings(companyNameBinder), {
            '#avatar-img': {
                attributes: [{
                    name   : 'src',
                    observe: 'image'
                }]
            }
        }),

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-company]' : companyNameBinder(),
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

    function companySelectBinder() {
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
