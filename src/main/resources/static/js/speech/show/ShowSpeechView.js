define([
    'text!speech/show/ShowSpeechTemplate.html',
    'common/view/ListView',
    'speaker/table/SpeakerRowView',
    'backbone.marionette'
], function (template, ListView, SpeakerRowView) {

    'use strict';

    //noinspection JSUnusedGlobalSymbols
    return Marionette.LayoutView.extend({

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
            '#speech-lang'           : 'lang'
        },

        regions : {
            'speakers' : '#speakers-container'
        },

        onBeforeShow : function () {
            var speakersView = new ListView({
                collection: this.model.get('speakers'),
                childView : SpeakerRowView,
                title     : 'Speakers'
            });

            this.showChildView('speakers', speakersView);
        },

        onRender: function () {
            this.stickit();
        }
    });

});