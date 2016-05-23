define([
    'event/details/EventDetailsRoute',
    'event/details/partners/PartnerLevelRoute',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function (EventDetailsRoute, PartnerLevelRoute, companyViewFactory, CompanyCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.companies                 = new CompanyCollection();
            this.companies.url             = this.model.url() + this.companies.url;
            this.companiesSearchCollection = new CompanyCollection();

            return $.when(this.model.fetch(), this.companies.fetch(), this.companiesSearchCollection.fetch());
        },

        render: function () {
            var eventView = companyViewFactory.newEventView({
                model           : this.model,
                collection      : this.companies,
                searchCollection: this.companiesSearchCollection,
                attachmentRoute : new PartnerLevelRoute()
            });
            this.view.showPartnersTab(eventView);
        }
    });
});