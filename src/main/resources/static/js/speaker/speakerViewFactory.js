define([
    'event/details/EventItemViewFactory',
    'speech/SpeechCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (ViewFactory, SpeechCollection, SpeakerRowTemplate, SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    return new ViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute: 'name',
        attachedCollectionType: SpeechCollection,

        bindings: {
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
            '#about'   : 'about'
        },

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }
    });
});
