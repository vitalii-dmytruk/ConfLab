define([
    'common/view/EditView',
    'text!speech/details/SpeechEditTemplate.html',
    'backbone.marionette'
], function (EditView, template) {

    'use strict';

    return EditView.extend({
        template: _.template(template),

        bindings: {
            '#speech-title'      : 'title',
            '#speech-description': 'description',
            '#speech-lang'       : 'lang'
        }
    });
});