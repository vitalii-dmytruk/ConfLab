define([
    'common/route/Route',
    'event/details/schedule/view/GridstackView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html',
    'event/details/schedule/model/IntervalCollectionGenerator',
    'event/details/schedule/view/RowAxisCollectionView'
], function ScheduleGridRoute(Route, GridstackView, SpeechScheduleTemplate, intervalCollectionGenerator,
                              RowAxisCollectionView) {

    'use strict';

    return Route.extend({

        intervalPeriod: 15,
        //TODO hardcoded event interval. Should be replaced with proper event start - end dates.
        from          : new Date(2016, 6, 20, 8, 0, 0, 0),
        to            : new Date(2016, 6, 20, 20, 0, 0, 0),

        initialize: function (options) {
            this.tracks             = options.tracks;
            this.container          = options.container;
            this.intervalCollection = createIntervalCollection(this.intervalPeriod, this.from, this.to);
        },

        render: function () {
            this.scheduleView = new GridstackView({
                cellHeight    : 20,
                verticalMargin: 5,
                float         : true,
                minRowsCount  : this.intervalCollection.length,
                fixed         : true,
                width         : this.tracks.length
            });

            this.container.show(this.scheduleView);

            var axisView = new RowAxisCollectionView({
                collection: createIntervalCollection(this.intervalPeriod, this.from, this.to),
                cellHeight: 20,
                cellMargin: 5
            });

            this.options.axisContainer.show(axisView);
        },

        showSpeeches: showSpeeches,

        onChange: function (cb) {
            this.scheduleView.on('gridstack:change', cb);
        },

        removeAll: function () {
            this.scheduleView.ui.gridstack.data('gridstack').removeAll();
        }
    });

    function showSpeeches(speeches) {
        this.speeches = speeches;

        speeches.forEach(function (speech) {
            var el       = $(_.template(SpeechScheduleTemplate)({title: speech.get('title')})),
                column   = this.tracks.indexOf(this.tracks.get(speech.get('track').id)),
                position = speech.get('position'),
                height   = speech.get('duration'),
                width    = speech.get('allTracks') ? this.tracks.length : 1;

            this.scheduleView.addWidget(el, column, position, width, height,
                                        undefined, undefined, undefined, undefined, undefined, speech.get('id'));
        }, this);
    }

    function createIntervalCollection(period, from, to) {
        return intervalCollectionGenerator.generate({
            from  : from,
            to    : to,
            period: period
        });
    }
});