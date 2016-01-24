define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'text!speech/table/SpeechRowTemplate.html',
    'text!speech/details/SpeechTemplate.html',
    'text!speech/details/SpeechEditTemplate.html',
    'speech/LanguageCollection'
], function (CollectionBinding, ViewFactory, SpeechRowTemplate, SpeechShowTemplate,
             SpeechEditTemplate, LanguageCollection) {

    'use strict';

    return new ViewFactory({
        title: 'Speech',
        tableTitle: 'Speeches',

        itemRowTemplate: SpeechRowTemplate,
        itemShowTemplate: SpeechShowTemplate,
        itemEditTemplate: SpeechEditTemplate,

        searchLabelAttribute: 'title',

        showBindings: {
            '#title': 'title',
            '#description': 'description',
            '#lang': {
                observe: 'lang',
                onGet: function (value) {
                    if (value) {
                        return value.name;
                    }
                }
            }
        },

        editBindings: {
            '#title': 'title',
            '#description': 'description',
            '#lang': new CollectionBinding(LanguageCollection, 'lang')
        },

        rowBindings: {
            '[data-speech-title]': 'title',
            '[data-speech-lang]': {
                observe: 'lang',
                onGet: function (value) {
                    if (value) {
                        return value.name;
                    }
                }
            },
            '[data-speech-description]': {
                observe: 'description',
                onGet: function (value) {
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