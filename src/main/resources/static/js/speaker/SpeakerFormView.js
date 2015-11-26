define([
    'text!speaker/SpeakerFormTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),
        bindings: {
            '#email'   : 'email',
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        },
        ui      : {
            saveSpeakerBtn: '#save-speaker-button'
        },

        events  : {
            'click @ui.saveSpeakerBtn': saveSpeaker
        },

        onRender: function () {
            this.stickit();
        }
    });

    function saveSpeaker() {
        this.model.save([], {wait: true})
    }
});