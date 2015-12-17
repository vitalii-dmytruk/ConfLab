define([
    'common/view/LinkTableView',
    'speech/table/SpeechRowView',
    'speech/details/SpeechLinkView'
], function (LinkTableView, SpeechRowView, SpeechLinkView) {

    'use strict';

    return LinkTableView.extend({
        title     : 'Speeches',
        RowView   : SpeechRowView,
        EditView  : SpeechLinkView
    });
});
