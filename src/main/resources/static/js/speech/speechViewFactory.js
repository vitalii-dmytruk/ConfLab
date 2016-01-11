define([
    'event/details/EventItemViewFactory',
    'speaker/SpeakerCollection',
    'text!speech/table/SpeechRowTemplate.html',
    'text!speech/details/SpeechTemplate.html',
    'text!speech/details/SpeechEditTemplate.html'
], function (ViewFactory, SpeakerCollection, SpeechRowTemplate, SpeechShowTemplate,
             SpeechEditTemplate) {

    'use strict';

    return new ViewFactory({
        title     : 'Speech',
        tableTitle: 'Speeches',

        itemRowTemplate : SpeechRowTemplate,
        itemShowTemplate: SpeechShowTemplate,
        itemEditTemplate: SpeechEditTemplate,

        searchLabelAttribute: 'title',

        attachedCollectionType: SpeakerCollection,

        bindings: {
            '#title'      : 'title',
            '#description': 'description',
            '#lang'       : 'lang'
        },

        rowBindings: {
            '[data-speech-title]'      : 'title',
            '[data-speech-lang]'       : 'lang',
            '[data-speech-description]': {
                observe: 'description',
                onGet  : function (value) {
                    if (value.length > 250) {
                        return value.substring(0, 250) + "...";
                    } else {
                        return value;
                    }
                }
            }
        }
    });
});