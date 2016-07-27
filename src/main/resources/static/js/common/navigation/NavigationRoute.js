define([
    'common/route/Route',
    'common/navigation/NavigationView'
], function NavigationRoute(Route, NavigationView) {

    'use strict';

    return Route.extend({

        constructor: function (options) {
            this.mergeOptions(options,
                ['baseUrl', 'navsRegion', 'currentNavRegion', 'navsCollection', 'className', 'childView',
                 'routeOptions']);
            Route.apply(this, arguments);
        },

        render: function (path) {
            var params = parseParams(path),
                nav    = getNav(this.navsCollection, params.navId);

            this.navsView = this.gatNavsView();
            this.navsView.on('childview:clicked', function (args) {
                this.select(args.model)
            }, this);
            this.navsRegion.show(this.navsView);

            nav && this.select(nav, {replace: true, subPath: params.subPath});

        },

        select: function (nav, options) {
            var routeClass, routeOptions, subUrl;

            options    = options || {};
            subUrl     = this.baseUrl + '/' + nav.get('id');
            routeClass = this.getRouteClass(nav);

            this.navsView.activateItem(nav);
            Backbone.history.navigate(subUrl + buildSubPath(options.subPath), {replace: options.replace});

            routeOptions = {
                baseUrl  : subUrl,
                container: this.currentNavRegion,
                nav      : nav
            };
            this.routeOptions && _.extend(routeOptions, this.routeOptions(this.options));

            new routeClass(routeOptions).enter([options.subPath]);
        },

        gatNavsView: function () {
            return new NavigationView({
                className : this.className,
                childView : this.childView,
                collection: this.navsCollection
            });
        }
    });

    function parseParams(path) {
        var result = {};

        if (path) {
            var params = path.split(/\/(.*)/);
            return {
                navId  : params[0],
                subPath: params[1]
            }
        }
        return result;
    }

    /**
     * Returns nav by the navId.
     * If navId is not specified return first nav in collection
     * @param navsCollection
     * @param navId
     */
    function getNav(navsCollection, navId) {
        var nav;
        if (navId) {
            nav = navsCollection.get(navId) || notifyPathNotFound();
        } else {
            nav = navsCollection.first()
        }
        return nav;
    }

    function buildSubPath(subPath) {
        return subPath ? '/' + subPath : '';
    }


    function notifyPathNotFound() {
        return Backbone.Radio.channel('notify')
            .request('error', 'Path "' + Backbone.history.getFragment() + '" does not exists.');
    }
});