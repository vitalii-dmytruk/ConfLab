define([
   'speaker/SpeakerView',
   'backbone.marionette'
], function (SpeakerView) {

    'use strict';

    return Marionette.CollectionView.extend({
        childView: SpeakerView,

        onBeforeRender: loadData
    });

    function loadData() {
        this.collection.fetch();
    }
});