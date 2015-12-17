define([
    'common/view/DetailsView',
    'speech/details/SpeechEditView',
    'speech/details/SpeechView'
], function (DetailsView, SpeechEditView, SpeechView) {

    'use strict';

    return DetailsView.extend({
        title   : 'Speech',
        EditView: SpeechEditView,
        ShowView: SpeechView
    });
});