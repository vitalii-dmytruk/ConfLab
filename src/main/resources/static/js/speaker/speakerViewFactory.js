define([
    'common/view/ItemViewFactory',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (ItemViewFactory, SpeakerRowTemplate, SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    return new ItemViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute: 'name',

        bindings: {
            '#email'   : {
                attributes: [{
                    name   : 'href',
                    observe: 'email',
                    onGet  : function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe   : 'email',
                onGet     : function (value) {
                    return value;
                }
            },
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        },

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }

    });
});
