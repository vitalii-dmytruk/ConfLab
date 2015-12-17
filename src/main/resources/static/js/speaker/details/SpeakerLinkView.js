define([
    'speaker/details/SpeakerEditView',
    'common/behavior/SearchBehavior'
], function (SpeakerEditView, SearchBehavior) {

    'use strict';

    return SpeakerEditView.extend({
        behaviors: {
            search: {behaviorClass: SearchBehavior}
        }
    });
});