define([
    'common/view/TableView',
    'speaker/table/SpeakerRowView',
    'speaker/details/SpeakerEditView'
], function (TableView, SpeakerRowView, SpeakerEditView) {

    'use strict';

    return TableView.extend({
        title     : 'Speakers',
        RowView   : SpeakerRowView,
        EditView  : SpeakerEditView
    });
});
