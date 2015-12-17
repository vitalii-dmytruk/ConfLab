define([
    'text!speech/details/SpeechTemplate.html',
    'speech/details/SpeechEditView'
], function (template, SpeechEditView) {

    'use strict';

    return SpeechEditView.extend({
        template: _.template(template)
    });

});
