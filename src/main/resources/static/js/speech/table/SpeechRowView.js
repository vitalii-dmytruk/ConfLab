define([
    'text!speech/table/SpeechRowTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        tagName   : 'a',
        className : 'list-group-item',
        attributes: function () {
            return {
                href: '#speeches/' + this.model.get('id')
            };
        },

        bindings: {
            '[data-speech-title]'      : 'title'
        },

        onRender: function () {
            this.stickit();
        }
    });
});
