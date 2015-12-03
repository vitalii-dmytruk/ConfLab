define([
    'text!speaker/edit/EditSpeakerTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        bindings: {
            '#speaker-update-action': {
                observe: 'id',
                onGet  : function (id) {
                    var action = id ? 'edit' : 'add';

                    return 'Speakers: ' + action;
                }
            },

            '#email'   : 'email',
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        },

        ui: {
            updateSpeakerBtn      : '#update-speaker-button',
            cancelUpdateSpeakerBtn: '#cancel-update-speaker-button'
        },

        events: {
            'click @ui.updateSpeakerBtn'      : saveSpeaker,
            'click @ui.cancelUpdateSpeakerBtn': cancel
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
                view.trigger('save');
            }
        });
    }

    function cancel() {
        this.trigger('cancel');
    }

});