define([
    'event/details/EventItemViewFactory',
    'speech/SpeechCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (ViewFactory, SpeechCollection, SpeakerRowTemplate, SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    var bindings = {
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
        '#company' : {
            observe : 'company',
            onGet : function (value) {
                return value & value.name;
            },
            getVal : function ($el, event, options) {

            },
            onSet : function (value, options) {

            }
        },
        '#about'   : 'about'
    };
    return new ViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute  : 'name',
        attachedCollectionType: SpeechCollection,

        editBindings: bindings,
        showBindings: bindings,

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }
    });
});
