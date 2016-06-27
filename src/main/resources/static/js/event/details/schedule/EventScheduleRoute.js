define([
    'common/route/Route',
    'event/details/schedule/view/ScheduleLayoutView',
    'event/details/schedule/view/GridstackView',
    'event/details/schedule/view/TracksScheduleCollectionView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html',
    'track/TracksCollection',
    'speech/SpeechCollection',
    'event/details/schedule/view/RowAxisCollectionView',
    'event/details/schedule/model/RowAxisCollection',
    'event/details/schedule/model/IntervalCollectionGenerator'
], function EventScheduleRoute(Route, ScheduleLayoutView, GridstackView, TracksScheduleCollectionView,
                               SpeechScheduleTemplate, TracksCollection, SpeechCollection, RowAxisCollectionView,
                               RowAxisCollection, intervalCollectionGenerator) {

    'use strict';

    return Route.extend({

        cellHeight    : 20,
        cellMargin    : 5,
        intervalPeriod: 15,
        //TODO hardcoded event interval. Should be replaced with proper event start - end dates.
        from          : new Date(2016, 6, 20, 8, 0, 0, 0),
        to            : new Date(2016, 6, 20, 20, 0, 0, 0),

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container;

            this.tracks       = new TracksCollection();
            this.tracks.url   = this.event.url() + this.tracks.url;
            this.speeches     = new SpeechCollection();
            this.speeches.url = this.event.url() + this.speeches.url;

            this.intervalCollection = createIntervalCollection(this.intervalPeriod, this.from, this.to);
        },

        fetch: function () {
            return $.when(this.tracks.fetch(), this.speeches.fetch());
        },

        render: function () {
            var tracks             = this.tracks,
                speeches           = this.speeches;
            var scheduleLayoutView = new ScheduleLayoutView(),
                tracksHeaderView   = new TracksScheduleCollectionView({collection: this.tracks}),
                scheduleView       = new GridstackView({
                    cellHeight    : this.cellHeight,
                    verticalMargin: this.cellMargin,
                    float         : true,
                    minRowsCount  : this.intervalCollection.length,
                    fixed         : true,
                    width         : this.tracks.length
                }),
                speechesView       = new GridstackView({
                    cellHeight    : this.cellHeight * 2,
                    verticalMargin: this.cellMargin,
                    minRowsCount  : 1,
                    width         : 1
                }),
                axisView           = new RowAxisCollectionView({
                    collection: this.intervalCollection,
                    cellHeight: this.cellHeight,
                    cellMargin: this.cellMargin
                });

            this.container.show(scheduleLayoutView);

            scheduleLayoutView.on('schedule:save', function () {
                speeches.updateAll();
            });

            scheduleLayoutView.showChildView('tracksHeader', tracksHeaderView);
            scheduleLayoutView.showChildView('schedule', scheduleView);
            scheduleLayoutView.showChildView('speeches', speechesView);
            scheduleLayoutView.showChildView('axis', axisView);
            showSpeeches(speeches, tracks, speechesView, scheduleView);

            scheduleView.on('gridstack:change', function (event, items) {
                items.forEach(function (item) {
                    var id     = item.el.attr('data-gs-id');
                    var speech = speeches.get(id);
                    speech.set('track', tracks.at(item.x));
                    speech.set('position', item.y);
                    speech.set('duration', item.height);
                    speech.set('allTracks', item.width == tracks.length)
                });
            });

            speechesView.on('gridstack:change', function (event, items) {
                items.forEach(function (item) {
                    var id     = item.el.attr('data-gs-id');
                    var speech = speeches.get(id);
                    speech.set('track', null);
                    speech.set('position', null);
                    speech.set('duration', null);

                    if (item.height > 1 || item.width > 1) {
                        item._grid.resize(item.el, 1, 1);
                    }
                });
            });
        }
    });

    function showSpeeches(speeches, tracks, speechView, scheduleView) {
        speeches.each(function (speech, i) {
            var el       = $(_.template(SpeechScheduleTemplate)({title: speech.get('title')})),
                column   = 0,
                position = i,
                height   = 1,
                width    = 1;

            //if speech have been already scheduled:
            if (speech.get('track')) {
                column   = tracks.indexOf(tracks.get(speech.get('track').id));
                position = speech.get('position');
                height   = speech.get('duration');
                width    = speech.get('allTracks') ? tracks.length : 1;

                scheduleView.addWidget(el, column, position, width, height,
                                       undefined, undefined, undefined, undefined, undefined, speech.get('id'));

            } else {
                speechView.addWidget(el, column, position, width, height,
                                     undefined, undefined, undefined, undefined, undefined, speech.get('id'));
            }
        });
    }

    function createIntervalCollection(period, from, to) {
        return intervalCollectionGenerator.generate({
            from  : from,
            to    : to,
            period: period
        });
    }
});