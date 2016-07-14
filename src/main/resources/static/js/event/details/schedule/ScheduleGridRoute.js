define([
    'common/route/Route',
    'event/details/schedule/view/GridstackView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html'
], function ScheduleGridRoute(Route, GridstackView, SpeechScheduleTemplate) {

    'use strict';

    return Route.extend({

        rowsCount   : 49,
        hourStart   : 8,
        timeInterval: 15,

        initialize: function (options) {
            this.tracks    = options.tracks;
            this.container = options.container;
        },

        render: function () {
            this.scheduleView = new GridstackView({
                float          : true,
                width          : this.tracks.length,
                rowsCount      : this.rowsCount,
                cellHeight     : 20,
                verticalMargin : 5,
                rowTitles      : this.createRowTitles(),
                columnTitles   : this.createColumnTitles(),
                rowTitlesOffset: 40
            });

            this.container.show(this.scheduleView);
        },

        showSpeeches: showSpeeches,

        onChange: function (cb) {
            this.scheduleView.on('gridstack:change', cb);
        },

        removeAll: function () {
            this.scheduleView.ui.gridstack.data('gridstack').removeAll();
        },

        createColumnTitles: createColumnTitles,

        createRowTitles: createRowTitles
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

    function createColumnTitles() {
        return this.tracks.map(function (track) {
            return track.get('name');
        })
    }

    function createRowTitles() {
        var offset = this.hourStart * 60,
            minutesCount,
            hour,
            minutes,
            result = [];

        var normalize = function (num) {
            return num < 10 ? ('0' + num) : num;
        };

        for (var i = 0; i < this.rowsCount; i++) {
            minutesCount = offset + this.timeInterval * i;
            hour         = (minutesCount / 60).toFixed(0);
            minutes      = minutesCount % 60;
            result.push(normalize(hour) + ':' + normalize(minutes));
        }

        return result;
    }
});