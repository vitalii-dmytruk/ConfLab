define([
    'common/view/TableView',
    'speech/table/SpeechRowView',
    'speech/details/SpeechEditView'
], function (TableView, SpeechRowView, SpeechEditView) {

    'use strict';

    return TableView.extend({
        title     : 'Speeches',
        RowView   : SpeechRowView,
        EditView  : SpeechEditView
    });
});
