define([
    'common/view/DetailsView',
    'speaker/details/SpeakerEditView',
    'speaker/details/SpeakerView'
], function (DetailsView, SpeakerEditView, SpeakerView) {

    'use strict';

    return DetailsView.extend({
        title   : 'Speaker',
        EditView: SpeakerEditView,
        ShowView: SpeakerView
    });
});