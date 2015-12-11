define([
   'text!speech/SpeechRowTemplate.html',
   'backbone.marionette'
],
function (template) {
    'use strict';

    return Marionette.ItemView.extend({
        template : _.template(template),
        tagName : 'a',
        className: 'list-group-item',
        bindings : {
            '[data-speech-title]': 'title',
            '[data-speech-lang]' : 'lang',
            '[data-speech-desc]' : 'description'
        },

        onRender: function () {
            this.stickit();
        }
    });
});

