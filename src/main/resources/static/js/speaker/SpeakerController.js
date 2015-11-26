define([
    'backbone.marionette',
    'backbone.radio'
], function (Marionette, Radio) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        speaker: function () {
            var self = this;

            require([
                        'speaker/Speaker',
                        'speaker/SpeakerCollection',
                        'speaker/SpeakerPageView',
                        'speaker/SpeakerTableView',
                        'speaker/SpeakerFormView'
                    ],
                    function (Speaker,
                              SpeakerCollection,
                              SpeakerPageView,
                              SpeakerTableView,
                              SpeakerFormView) {
                        var pageView,
                            collection;

                        pageView   = new SpeakerPageView();

                        collection = new SpeakerCollection();
                        self.container.show(pageView);

                        pageView.showChildView("table", new SpeakerTableView({collection: collection}));
                        pageView.showChildView("form", new SpeakerFormView({model: new Speaker()}));

                        Radio.channel('menu').request('activate', {path: 'speaker'});
            });
        }
    });

});