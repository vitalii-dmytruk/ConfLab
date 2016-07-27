define([
    'common/route/Route',
    'speech/details/SpeechDetailsLayoutView',
    'speech/details/SpeechEditViewSwitcher',
    'common/ListController',
    'speaker/SpeakerCollection',
    'speaker/speakerViewFactory'
], function SpeechDetailsRoute(Route, SpeechDetailsLayoutView, SpeechEditViewSwitcher, ListController,
                               SpeakerCollection, speakerViewFactory) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
            this.speech    = options.nav;
            this.event     = options.event;
        },

        fetch: function () {
            this.eventSpeakers  = new SpeakerCollection();
            this.speechSpeakers = this.speech.get('speakers');
            return this.eventSpeakers.fetch({data: {eventId: this.event.get('id')}});
        },

        render: function () {
            this.layoutView = new SpeechDetailsLayoutView();
            this.container.show(this.layoutView);
            new SpeechEditViewSwitcher({
                container: this.layoutView.getRegion('speechRegion'),
                model    : this.speech
            }).enter();

            new ListController({
                container           : this.layoutView.getRegion('speakersRegion'),
                collection          : this.speechSpeakers,
                title               : speakerViewFactory.tableTitle,
                rowView             : speakerViewFactory.itemRowView,
                searchLabelAttribute: speakerViewFactory.searchLabelAttribute,
                searchCollection    : this.eventSpeakers,
                EditView            : speakerViewFactory.itemEditView
            }).enter();

        }

    });
});