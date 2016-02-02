define([
    'common/MenuAwareRouter',
    'company/table/CompanyTableRoute',
    'company/details/CompanyDetailsRoute',
    'backbone.marionette'
], function (MenuAwareRouter, CompanyTableRoute, CompanyDetailsRoute) {

    'use strict';

    return MenuAwareRouter.extend({

        menuButton: new Backbone.Model({
            name: 'Companies',
            path: 'companies'
        }),

        initialize: function (options) {
            this.container = options.container;
        },

        routes: {
            'companies'    : getRoute(CompanyTableRoute),
            'companies/:id': getRoute(CompanyDetailsRoute)
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
