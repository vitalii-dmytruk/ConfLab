define([
    'text!speaker/edit/EditSpeakerTemplate.html',
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

        ui: {
            saveSpeakerBtn: '#save-speaker-button'
        },

        events: {
            'click @ui.saveSpeakerBtn': saveSpeaker
        },

        onRender: function () {
            this.stickit();
        }
    });

    function saveSpeaker() {
        var view = this;
        this.model.save([], {
            success: function () {
                view.collection.add(view.model, {merge: true});
                Backbone.history.navigate('speakers', {trigger: true});
            }
        });
    }

});