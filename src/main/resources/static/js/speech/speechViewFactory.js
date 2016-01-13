define([
    'event/details/EventItemViewFactory',
    'speaker/SpeakerCollection',
    'text!speech/table/SpeechRowTemplate.html',
    'text!speech/details/SpeechTemplate.html',
    'text!speech/details/SpeechEditTemplate.html',
    'backbone.radio',
    'speech/LanguageService',
    'select2'
], function (ViewFactory, SpeakerCollection, SpeechRowTemplate, SpeechShowTemplate,
             SpeechEditTemplate, Radio, LanguageService) {

    'use strict';

    return new ViewFactory({
        title     : 'Speech',
        tableTitle: 'Speeches',

        itemRowTemplate : SpeechRowTemplate,
        itemShowTemplate: SpeechShowTemplate,
        itemEditTemplate: SpeechEditTemplate,

        searchLabelAttribute: 'title',

        attachedCollectionType: SpeakerCollection,

        showBindings: {
            '#title'      : 'title',
            '#description': 'description',
            '#lang'       : {
                observe: 'lang',
                onGet  : function (value) {
                    if (value) {
                        return value.name;
                    }
                }
            }
        },

        editBindings: {
            '#title'      : 'title',
            '#description': 'description',
            '#lang'       : {
                observe      : 'lang',
                initialize   : function ($el) {
                    $el.select2({
                        theme      : 'bootstrap',
                        placeholder: 'Choose from the list',
                        allowClear : true
                    });

                },
                selectOptions: {
                    collection   : function () {
                        return Radio.channel('languages').request('getLanguages');
                    },
                    labelPath    : 'name',
                    defaultOption: {
                        value: null
                    }
                }
            }
        },

        rowBindings: {
            '[data-speech-title]'      : 'title',
            '[data-speech-lang]'       : {
                observe: 'lang',
                onGet  : function (value) {
                    if (value) {
                        return value.name;
                    }
                }
            },
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