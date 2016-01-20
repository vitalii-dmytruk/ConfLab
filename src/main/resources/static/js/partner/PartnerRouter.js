define([
    'common/MenuAwareRouter',
    'partner/table/PartnerTableRoute',
    'partner/details/PartnerDetailsRoute',
    'backbone.marionette'
], function (MenuAwareRouter, PartnerTableRoute, PartnerDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: new Backbone.Model({
            name: 'Partners',
            path: 'companies'
        }),

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'companies'    : getRoute(PartnerTableRoute),
            'companies/:id': getRoute(PartnerDetailsRoute)
        }

    });

    function getRoute(RouteClass) {
        return function () {
            return new RouteClass({
                container: this.container
            });
        }
    }

});
