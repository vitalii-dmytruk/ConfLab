define([
    'common/route/Route',
    'event/details/partners/PartnerLevelRoute',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function EventPartnersRoute(Route, PartnerLevelRoute, companyViewFactory, CompanyCollection) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.event     = options.event;
            this.container = options.container
        },

        fetch: function () {
            this.companies                 = new CompanyCollection();
            this.companies.url             = this.event.url() + this.companies.url;
            this.companiesSearchCollection = new CompanyCollection();

            return $.when(this.companies.fetch(), this.companiesSearchCollection.fetch());
        },

        render: function () {
            var eventView = companyViewFactory.newEventView({
                model           : this.event,
                collection      : this.companies,
                searchCollection: this.companiesSearchCollection,
                attachmentRoute : new PartnerLevelRoute()
            });
            this.container.show(eventView);
        }
    });
});