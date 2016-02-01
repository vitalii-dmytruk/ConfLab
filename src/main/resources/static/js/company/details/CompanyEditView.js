define([
    'common/behavior/FormBehavior',
    'common/image/ImageEditView',
    'backbone.marionette'
], function (FormBehavior, ImageEditView) {

    'use strict';

    return Marionette.LayoutView.extend({
        behaviors: {
            form: {
                behaviorClass: FormBehavior
            }
        },

        regions  : {
            logoRegion: '#logo'
        },

        onBeforeShow: function () {
            new ImageEditView({
                container   : this.logoRegion,
                model       : this.model,
                imageUrlAttr: 'image',
                viewport    : {
                    width : 200,
                    height: 200,
                    type  : 'rectangle'
                },
                boundary    : {
                    width : 200,
                    height: 200
                }
            }).show();
        }
    });
});