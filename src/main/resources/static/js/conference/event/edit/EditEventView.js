define([
    'text!conference/event/edit/EditEventTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        bindings: {
            '#event-update-action': {
                observe: 'id',
                onGet  : function (id) {
                    var action = id ? 'edit' : 'add';

                    return 'Conferences: ' + action;
                }
            },

            '#event-name'       : 'name',
            '#event-description': 'description',
            '#event-start-date'  : 'startDate',
            '#event-end-date'    : 'endDate'
        },

        ui: {
            updateEventBtn      : '#update-event-button',
            cancelUpdateEventBtn: '#cancel-update-event-button'
        },

        events: {
            'click @ui.updateEventBtn'      : saveEvent,
            'click @ui.cancelUpdateEventBtn': cancel
        },

        onRender: function () {
            this.stickit();
        }
    });


    function saveEvent() {
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