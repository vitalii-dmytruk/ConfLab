define([
    'text!speech/show/ShowSpeechTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        bindings: {
            '[data-speech-edit-href]': {
                attributes: [{
                    name   : 'href',
                    observe: 'id',
                    onGet  : function (id) {
                        return '#speeches/' + id + '/edit'
                    }
                }]
            },
            '[data-speech-title]'    : 'title',
            '#speech-title'          : 'title',
            '#speech-description'    : 'description',
            '#speech-lang'           : 'lang',
            '#speech-speakers'       : 'speakers'
        },

        onRender: function () {
            this.stickit();
        }
    });

});