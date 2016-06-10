define([
    'common/route/Route',
    'event/details/schedule/view/ScheduleLayoutView',
    'event/details/schedule/view/GridstackView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html',
    'track/TracksCollection',
    'speech/SpeechCollection'
], function EventScheduleRoute(Route, ScheduleLayoutView, GridstackView, SpeechScheduleTemplate, TracksCollection,
                               SpeechCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container;

            this.tracks       = new TracksCollection();
            this.tracks.url   = this.event.url() + this.tracks.url;
            this.speeches     = new SpeechCollection();
            this.speeches.url = this.event.url() + this.speeches.url;
        },

        fetch: function () {
            return $.when(this.tracks.fetch(), this.speeches.fetch());
        },

        render: function () {
            var scheduleLayoutView = new ScheduleLayoutView(),
                scheduleView       = new GridstackView({
                    float    : true,
                    rowsCount: 8,
                    width    : this.tracks.length
                }),
                speechesView       = new GridstackView({
                    width: 1
                });

            this.container.show(scheduleLayoutView);
            scheduleLayoutView.showChildView('schedule', scheduleView);
            scheduleLayoutView.showChildView('speeches', speechesView);
            showSpeeches(this.speeches, speechesView);
        }
    });

    function showSpeeches(speeches, speechView) {
        speeches.each(function (speech, i) {
            speechView.addWidget($(_.template(SpeechScheduleTemplate)({title: speech.get('title')})), 0, i, 1, 1);
        });
    }
});