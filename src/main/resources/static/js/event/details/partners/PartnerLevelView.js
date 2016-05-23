define([
    'text!event/details/partners/PartnerLevelTemplate.html',
    'backbone.marionette',
    'backbone.stickit'
], function PartnerLevelView(template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            partnerLevel: '#partner-level'
        },

        modelEvents: {
            'change:partnerLevel': updatePartnerLevel
        },

        bindings: {
            '#partner-level': {
                observe: 'partnerLevel',
                selectOptions: {
                    collection: function () {
                        return this.collection;
                    },
                    labelPath : 'name'
                }
            }
        },

        onRender: function () {
            this.stickit();
        }
    });

    function updatePartnerLevel() {
        var attributes, model;

        attributes    = this.model.get('partnerLevel');
        model         = new this.collection.model(attributes);
        model.urlRoot = this.options.urlRoot + model.urlRoot;
        model.save();
    }
});