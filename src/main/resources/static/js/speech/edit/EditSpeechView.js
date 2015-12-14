define([
    'text!speech/edit/EditSpeechTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        bindings: {
            '#speech-update-action': {
                observe: 'id',
                onGet  : function (id) {
                    var action = id ? 'edit' : 'add';

                    return 'Speech: ' + action;
                }
            },

            '#speech-title'      : 'title',
            '#speech-description': 'description',
            '#speech-lang'       : 'lang',
            '#speech-speakers'   : 'speakers'
        },

        ui: {
            updateSpeechBtn      : '#update-speech-button',
            cancelUpdateSpeechBtn: '#cancel-update-speech-button'
        },

        events: {
            'click @ui.updateSpeechBtn'      : saveSpeech,
            'click @ui.cancelUpdateSpeechBtn': cancel
        },

        onRender: function () {
            this.stickit();
        }
    });


    function saveSpeech() {
        var view = this;

        this.model.save().done(function () {
            view.trigger('save');
        });
    }

    function cancel() {
        this.trigger('cancel');
    }

});