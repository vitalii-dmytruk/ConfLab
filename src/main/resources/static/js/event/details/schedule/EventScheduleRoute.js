define([
    'common/route/Route',
    'common/navigation/NavigationView',
    'event/EventTabView',
    'event/details/schedule/view/ScheduleLayoutView',
    'track/TracksCollection',
    'speech/SpeechCollection',
    'event/details/schedule/FreeSpeechesRoute',
    'event/details/schedule/ScheduleGridRoute',
    'moment'
], function EventScheduleRoute(Route, NavigationView, EventTabView, ScheduleLayoutView,
                               TracksCollection, SpeechCollection, FreeSpeechesRoute, ScheduleGridRoute, moment) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container;

            this.daysCollection = getDaysCollection(this.event);
            this.currentDay     = this.daysCollection.at(0);

            this.tracks     = new TracksCollection();
            this.tracks.url = this.event.url() + this.tracks.url;

            this.speeches     = new SpeechCollection();
            this.speeches.url = this.event.url() + this.speeches.url;
        },

        fetch: function () {
            return $.when(this.tracks.fetch(), this.speeches.fetch());
        },

        render: function () {
            var scheduleLayoutView = new ScheduleLayoutView(),
                tabsView           = new NavigationView({
                    className : 'nav nav-tabs',
                    childView : EventTabView,
                    collection: this.daysCollection
                });

            this.container.show(scheduleLayoutView);
            scheduleLayoutView.showChildView('days', tabsView);

            createFreeSpeechesRoute(scheduleLayoutView.getRegion('speeches'), this.speeches);

            var scheduleGridRoute = createScheduleGridRoute(scheduleLayoutView.getRegion('schedule'),
                                                            scheduleLayoutView.getRegion('axis'), this);

            tabsView.on('childview:clicked', function (args) {
                scheduleGridRoute.removeAll();

                this.currentDay = args.model;

                showScheduledDaySpeeches(tabsView, scheduleGridRoute, this.currentDay, this.speeches);
            }, this);

            scheduleLayoutView.on('schedule:save', function () {
                this.speeches.updateAll();
            }, this);

            showScheduledDaySpeeches(tabsView, scheduleGridRoute, this.currentDay, this.speeches);
        }
    });

    function showScheduledDaySpeeches(tabsView, scheduledGridRoute, day, speeches) {
        tabsView.activateItem(day);

        scheduledGridRoute.showSpeeches(new SpeechCollection(speeches.filter(function (speech) {
            return speech.get('day') == day.get('id');
        })));
    }

    function createFreeSpeechesRoute(container, speeches) {
        var freeSpeechesRoute = new FreeSpeechesRoute({
            container: container
        });

        freeSpeechesRoute.enter();

        freeSpeechesRoute.onChange(function (event, items) {
            items.forEach(function (item) {
                var id     = item.el.attr('data-gs-id');
                var speech = speeches.get(id);
                speech.set('track', null);
                speech.set('position', null);
                speech.set('duration', null);
                speech.set('day', null);

                if (item.height > 1 || item.width > 1) {
                    item._grid.resize(item.el, 1, 1);
                }
            });
        });

        freeSpeechesRoute.showSpeeches(new SpeechCollection(speeches.filter(function (speech) {
            return !speech.get('track');
        })));

        return freeSpeechesRoute;
    }

    function createScheduleGridRoute(container, axisContainer, route) {
        var scheduleGridRoute = new ScheduleGridRoute({
            container    : container,
            axisContainer: axisContainer,
            tracks       : route.tracks
        });

        scheduleGridRoute.enter();

        scheduleGridRoute.onChange(function (event, items) {
            items && items.forEach(function (item) {
                var id     = item.el.attr('data-gs-id'),
                    speech = route.speeches.get(id);
                speech.set('track', route.tracks.at(item.x));
                speech.set('position', item.y);
                speech.set('duration', item.height);
                speech.set('allTracks', item.width == route.tracks.length);
                speech.set('day', route.currentDay.get('id'))
            });
        });

        return scheduleGridRoute;
    }

    function getDaysCollection(event) {
        var dateFormat = 'DD-MMM-yyyy',
            from       = moment(event.get('startDate'), dateFormat),
            to         = moment(event.get('endDate'), dateFormat),
            count      = to.diff(from, 'days');

        var daysCollection = new Backbone.Collection();

        for (var i = 0; i <= count; i++) {
            var dayNumber = i + 1;
            daysCollection.add({id: dayNumber, label: 'Day ' + dayNumber});
        }
        return daysCollection;
    }
});