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

        ui: {
            "addSpeechButton": '#speeches-add'
        },

        bindings: {
            '[data-speaker-edit-href]': {
                attributes: [{
                    name   : 'href',
                    observe: 'id',
                    onGet  : function (id) {
                        return '#' + this.model.urlRoot + '/' + id + '/edit'
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


        onRender: insertModelSpecificData
    });

    function insertModelSpecificData () {
        setAddSpeechHref(this);
        this.stickit();
    }

    function setAddSpeechHref(view){
        view.ui.addSpeechButton.attr('href', '#' + view.model.urlRoot + '/new');
    }
});