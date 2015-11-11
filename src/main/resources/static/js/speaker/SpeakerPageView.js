define([
   'speaker/SpeakerView',
   'text!speaker/SpeakerLayoutTemplate.html',
   'backbone.marionette'
], function (SpeakerView, template) {

    'use strict';

    return Marionette.CollectionView.extend({
        template: _.template(template),

        childView: SpeakerView,
        childViewContainer: '[data-table-region]',

        onBeforeRender: loadData
    });

    function loadData() {
        this.collection.fetch();
    }
});