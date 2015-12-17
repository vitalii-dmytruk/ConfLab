define([
    'speaker/details/SpeakerView',
    'text!speaker/details/SpeakerEditTemplate.html',
    'backbone.marionette'
], function (SpeakerView, template) {

    'use strict';

    return SpeakerView.extend({
        template: _.template(template)
    });
});