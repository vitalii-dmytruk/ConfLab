define([
    'common/route/Route',
    'event/details/partners/PartnerLevelModel',
    'event/details/partners/PartnerLevelCollection',
    'event/details/partners/PartnerLevelView',
    'backbone'
], function (Route, PartnerLevelModel, PartnerLevelCollection, PartnerLevelView) {

    'use strict';

    return Route.extend({

        fetch: function (container, eventModel, itemModel) {
            this.urlRoot       = eventModel.url() + itemModel.url();
            this.model         = new PartnerLevelModel();
            this.model.urlRoot = this.urlRoot + this.model.urlRoot;
            this.collection    = new PartnerLevelCollection();
            return $.when(this.model.fetch(), this.collection.fetch());
        },

        render: function (container) {
            container.show(new PartnerLevelView({
                model     : new Backbone.Model({partnerLevel: this.model.attributes}),
                collection: this.collection,
                urlRoot   : this.urlRoot
            }));
        }
    });

});