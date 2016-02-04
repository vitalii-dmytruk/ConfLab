define([
    'common/behavior/FormBehavior',
    'common/image/ImageEditView',
    'backbone.marionette'
], function (FormBehavior, ImageEditView) {

    'use strict';

    return Marionette.LayoutView.extend({
        className: 'row',

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
                defaultImage: '/img/default-logo.jpg',
                imageUrlAttr: 'image',
                viewport    : {
                    width : 150,
                    height: 150,
                    type  : 'rectangle'
                },
                boundary    : {
                    width : 150,
                    height: 150
                }
            }).show();
        }
    });
});