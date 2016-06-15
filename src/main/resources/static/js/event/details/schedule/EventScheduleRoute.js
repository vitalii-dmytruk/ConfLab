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
            var scheduleLayoutView = new ScheduleLayoutView(),
                tracksHeaderView   = new TracksScheduleCollectionView({collection: this.tracks}),
                scheduleView       = new GridstackView({
                    cellHeight    : this.cellHeight,
                    verticalMargin: this.cellMargin,
                    float         : true,
                    rowsCount     : this.intervalCollection.length,
                    width         : this.tracks.length
                }),
                speechesView       = new GridstackView({
                    cellHeight    : this.cellHeight * 2,
                    verticalMargin: this.cellMargin,
                    width         : 1
                }),
                axisView           = new RowAxisCollectionView({
                    collection: this.intervalCollection,
                    cellHeight: this.cellHeight,
                    cellMargin: this.cellMargin
                });

            this.container.show(scheduleLayoutView);
            scheduleLayoutView.showChildView('tracksHeader', tracksHeaderView);
            scheduleLayoutView.showChildView('schedule', scheduleView);
            scheduleLayoutView.showChildView('speeches', speechesView);
            scheduleLayoutView.showChildView('axis', axisView);
            showSpeeches(this.speeches, speechesView);

            speechesView.on('gridstack:change', function (event, items) {
                items.forEach(function (item) {
                    if (item.height > 1 || item.width > 1) {
                        item._grid.resize(item.el, 1, 1);
                    }
                });
            });

            scheduleView.on('gridstack:change', function (event, items) {
                scheduleView.getSnapshot();
            });
        }
    });

    function showSpeeches(speeches, speechView) {
        speeches.each(function (speech, i) {
            speechView.addWidget($(_.template(SpeechScheduleTemplate)({title: speech.get('title')})), 0, i, 1, 1,
                                 undefined, undefined, undefined, undefined, undefined, speech.get('id'));
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