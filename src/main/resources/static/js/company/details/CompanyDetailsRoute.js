define([
    'common/route/Route',
    'company/CompanyModel',
    'company/companyViewFactory'
], function (Route, CompanyModel, companyViewFactory) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model = new CompanyModel({id: id});
            return this.model.fetch();
        },

        render: function () {
            this.view = new companyViewFactory.itemDetailsView({model: this.model});
            this.container.show(this.view);
        }
    });
});
