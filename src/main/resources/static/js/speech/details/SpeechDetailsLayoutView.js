define([
    'text!speech/details/SpeechDetailsLayoutTemplate.html',
    'backbone.marionette'
], function SpeechDetailsLayoutView(template) {

    'use strict';

    return Marionette.LayoutView.extend({
        template : _.template(template),

        regions: {
            speechRegion : '[data-speech-region]',
            speakersRegion  : '[data-speakers-region]'
        }
    });

});