define([
    'speech/details/SpeechEditView',
    'common/behavior/SearchBehavior'
], function (SpeechEditView, SearchBehavior) {

    'use strict';

    return SpeechEditView.extend({
        behaviors: {
            search: {behaviorClass: SearchBehavior}
        }
    });
});