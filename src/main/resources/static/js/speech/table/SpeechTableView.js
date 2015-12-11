define([
    'speech/table/SpeechRowView',
    'text!speech/table/SpeechTableTemplate.html',
    'backbone.marionette'
], function (SpeechRowView, template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childView         : SpeechRowView,
        childViewContainer: '[data-speech-table]'

    });


});