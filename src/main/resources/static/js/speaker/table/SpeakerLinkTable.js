define([
    'common/view/LinkTableView',
    'speaker/table/SpeakerRowView',
    'speaker/details/SpeakerLinkView'
], function (LinkTableView, SpeakerRowView, SpeakerLinkView) {

    'use strict';

    return LinkTableView.extend({
        title     : 'Speakers',
        RowView   : SpeakerRowView,
        EditView  : SpeakerLinkView
    });
});
