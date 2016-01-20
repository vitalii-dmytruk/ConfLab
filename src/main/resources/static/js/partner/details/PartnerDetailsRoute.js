define([
    'common/route/Route',
    'partner/PartnerModel',
    'partner/partnerViewFactory'
], function (Route, PartnerModel, partnerViewFactory) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model = new PartnerModel({id: id});
            return this.model.fetch();
        },

        render: function () {
            this.view = new partnerViewFactory.itemDetailsView({model: this.model});
            this.container.show(this.view);
        }
    });
});
