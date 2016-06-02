define([
    'common/route/Route',
    'common/navigation/NavigationView',
    'event/details/info/EventInfoRoute',
    'event/details/speakers/EventSpeakersRoute',
    'event/details/speeches/EventSpeechesRoute',
    'event/details/partners/EventPartnersRoute',
    'event/details/tracks/EventTracksRoute',
    'event/details/schedule/EventScheduleRoute',
    'event/EventTabView'

], function TabsRoute(Route, NavigationView, EventInfoRoute, EventSpeakersRoute, EventSpeechesRoute, EventPartnersRoute,
                      EventTracksRoute, EventScheduleRoute, EventTabView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.baseUrl          = options.baseUrl;
            this.tabsRegion       = options.tabsRegion;
            this.currentTabRegion = options.currentTabRegion;
            this.event            = options.event;
            this.tabsCollection   = getTabsCollection();
        },

        render: function (path) {
            this.tabsView = new NavigationView({
                className : 'nav nav-tabs',
                childView : EventTabView,
                collection: this.tabsCollection
            });
            this.tabsView.on('childview:clicked', function (args) {
                this.navigateToTab(args.model)
            }, this);
            this.tabsRegion.show(this.tabsView);

            var params = parseParams(path);
            var tab    = getTab(this.tabsCollection, params.tabId);

            if (!tab) {
                notifyPathNotFound();
            } else {
                this.navigateToTab(tab, {replace: true, subPath: params.subPath});
            }
        },

        navigateToTab: function (tab, options) {
            var routeClass, subUrl;

            options    = options || {};
            subUrl     = this.baseUrl + '/' + tab.get('id');
            routeClass = tab.get('routeClass');

            this.tabsView.activateItem(tab);
            Backbone.history.navigate(subUrl + buildSubPath(options.subPath), {replace: options.replace});

            new routeClass({
                baseUrl  : subUrl,
                container: this.currentTabRegion,
                event    : this.event
            }).enter([options.subPath]);
        }
    });

    function parseParams(path) {
        var result = {};

        if (path) {
            var params = path.split(/\/(.*)/);
            return {
                tabId  : params[0],
                subPath: params[1]
            }
        }
        return result;
    }

    /**
     * Returns tab by the tabId.
     * If tabId is not specified return first tab in collection
     * @param tabsCollection
     * @param tabId
     */
    function getTab(tabsCollection, tabId) {
        return tabId ? tabsCollection.get(tabId) : tabsCollection.first()
    }

    function buildSubPath(subPath) {
        return subPath ? '/' + subPath : '';
    }

    function getTabsCollection() {
        return new Backbone.Collection([
            {
                id        : 'info',
                label     : 'Info',
                routeClass: EventInfoRoute
            }, {
                id        : 'speakers',
                label     : 'Speakers',
                routeClass: EventSpeakersRoute
            }, {
                id        : 'speeches',
                label     : 'Speeches',
                routeClass: EventSpeechesRoute
            }, {
                id        : 'partners',
                label     : 'Partners',
                routeClass: EventPartnersRoute
            }, {
                id        : 'tracks',
                label     : 'Tracks',
                routeClass: EventTracksRoute
            }, {
                id        : 'schedule',
                label     : 'Schedule',
                routeClass: EventScheduleRoute
            }
        ])
    }

    function notifyPathNotFound() {
        return Backbone.Radio.channel('notify')
            .request('error', 'Path "' + Backbone.history.getFragment() + '" does not exists.');
    }
});