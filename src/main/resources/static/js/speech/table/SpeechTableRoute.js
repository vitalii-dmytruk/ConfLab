define([
    'common/ListController',
    'speech/speechViewFactory',
    'speech/SpeechCollection'
], function (ListController, speechViewFactory, SpeechCollection) {

    'use strict';

    return ListController.extend({
        collectionClass: SpeechCollection,

        title  : 'Speeches',
        rowView: speechViewFactory.itemRowView
    });
});