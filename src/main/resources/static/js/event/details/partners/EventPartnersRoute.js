define([
    'event/details/EventDetailsRoute',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function (EventDetailsRoute, companyViewFactory, CompanyCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.speeches                 = new CompanyCollection();
            this.speeches.url             = this.model.url() + this.speeches.url;
            this.speechesSearchCollection = new CompanyCollection();

            return $.when(this.model.fetch(), this.speeches.fetch(), this.speechesSearchCollection.fetch());
        },

        render: function () {
            var eventView = companyViewFactory.newEventView({
                model           : this.model,
                collection      : this.speeches,
                searchCollection: this.speechesSearchCollection
            });
            this.view.showPartnersTab(eventView);
        }
    });
});