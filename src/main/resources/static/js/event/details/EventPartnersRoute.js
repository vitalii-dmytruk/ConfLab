define([
    'event/details/EventDetailsRoute',
    'partner/partnerViewFactory',
    'partner/PartnerCollection'
], function (EventDetailsRoute, partnerViewFactory, PartnerCollection) {

    'use strict';

    return EventDetailsRoute.extend({

        fetch: function () {
            this.partners                 = new PartnerCollection();
            this.partners.url             = this.model.url() + this.partners.url;
            this.partnersSearchCollection = new PartnerCollection();

            return $.when(this.model.fetch(), this.partners.fetch(), this.partnersSearchCollection.fetch());
        },

        render: function () {
            var eventView = partnerViewFactory.newEventView({
                model           : this.model,
                collection      : this.partners,
                searchCollection: this.partnersSearchCollection
            });
            this.view.showPartnersTab(eventView);
        }
    });
});