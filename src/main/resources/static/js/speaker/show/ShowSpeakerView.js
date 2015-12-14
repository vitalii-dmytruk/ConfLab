define([
    'speech/SpeechRowView',
    'text!speaker/show/ShowSpeakerTemplate.html',
    'backbone.marionette'
], function (SpeechView, template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childView: SpeechView,
        childViewContainer: '#speeches-container',

        bindings: {
            '#speeches-add'           : {
                attributes: [
                    convertToHref('id', function () {
                        return '#' + this.collection.url + '/new';
                    })
                ]
            },
            '[data-speaker-edit-href]': {
                attributes: [
                    convertToHref('id', function (id) {
                                  return '#' + this.model.urlRoot + '/' + id + '/edit'
                              }
                    )
                ]
            },

            '[data-speaker-name]': 'name',

            '[data-speaker-position]': 'position',

            '[data-speaker-email]': {
                observe   : 'email',
                attributes: [
                    convertToHref('email', function (email) {
                        return 'mailTo:' + email;
                    })
                ]
            },

            '[data-speaker-about]': 'about'
        },


        onRender: insertModelSpecificData
    });

    function insertModelSpecificData () {
        this.stickit();
    }

    function convertToHref(fromAttr, converter){
        return {
            name   : 'href',
            observe: fromAttr,
            onGet  : converter
        }
    }
});