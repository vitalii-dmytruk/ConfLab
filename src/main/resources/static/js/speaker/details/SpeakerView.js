define([
    'text!speaker/details/SpeakerTemplate.html',
    'speaker/details/SpeakerEditView'
], function (template, SpeakerEditView) {

    'use strict';

    return SpeakerEditView.extend({
        template: _.template(template)
    });

});