define([
    'text!common/view/DetailsTemplate.html',
    'speech/details/SpeechShowView',
    'backbone.marionette'
], function SpeechDetailsLayoutView(template,SpeechShowView) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        regions: {
            content   : '[data-content-region]',
            attachment: '[data-attachment-region]'
        },

        onBeforeShow: function () {
            this.getRegion('content').show(new SpeechShowView({
                model: this.model
            }));
        },

        showAttachment: function (view) {
            this.showChildView('attachment', view);
        }
    });
});