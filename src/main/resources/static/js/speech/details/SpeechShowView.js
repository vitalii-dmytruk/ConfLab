define([
    'text!speech/details/SpeechTemplate.html',
    'backbone.marionette'
], function SpeechShowView(template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        attributes: {
            style: 'position:relative;'
        },

        bindings: {
            '#title'      : 'title',
            '#description': 'description',
            '#lang'       : {
                observe: 'lang',
                onGet  : function (value) {
                    if (value) {
                        return value.name;
                    }
                }
            }
        },

        onRender: function () {
            this.stickit();
        }
    });
});