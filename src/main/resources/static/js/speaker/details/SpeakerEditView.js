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
            avatarRegion: '#avatar'
        },

        onBeforeShow: function () {
            new ImageEditView({
                container   : this.avatarRegion,
                model       : this.model,
                imageUrlAttr: 'image',
                viewport    : {
                    width : 200,
                    height: 200,
                    type  : 'circle'
                },
                boundary    : {
                    width : 200,
                    height: 200
                }
            }).show();
        }
    });
});