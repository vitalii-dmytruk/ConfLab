define([
    'common/route/ItemTableRoute',
    'speech/speechViewFactory',
    'speech/SpeechCollection'
], function (ItemTableRoute, speechViewFactory, SpeechCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: SpeechCollection,
        tableView      : speechViewFactory.itemTableView
    });
});