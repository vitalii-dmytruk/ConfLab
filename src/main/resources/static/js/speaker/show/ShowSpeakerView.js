define([
    'text!speaker/show/ShowSpeakerTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        bindings: {
            '[data-speaker-edit-href]': {
                attributes: [{
                    name   : 'href',
                    observe: 'id',
                    onGet  : function (id) {
                        return '#speakers/' + id + '/edit'
                    }
                }]
            },

            '[data-speaker-name]': 'name',

            '[data-speaker-position]': 'position',

            '[data-speaker-email]': {
                observe   : 'email',
                attributes: [{
                    name   : 'href',
                    observe: 'email',
                    onGet  : function (email) {
                        return 'mailTo:' + email;
                    }
                }]
            },

            '[data-speaker-about]': 'about'
        },

        onRender: function () {
            this.stickit();
        }
    });

});