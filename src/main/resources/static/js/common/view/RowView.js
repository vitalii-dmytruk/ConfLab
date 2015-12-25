define([
    'backbone.marionette'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
        tagName   : 'a',
        className : 'list-group-item',

        ui : {
            actionIcons: '[data-actions]'
        },

        events : {
            'mouseenter': showActionIcons,
            'mouseleave': hideActionIcons,
            'hover @ui.actionIcons' : function(e){
                return e.type;
            }
        },

        attributes: function () {
            return {
                href: '#' + this.model.url()
            };
        },

        onRender  : function () {
            this.stickit();
        }
    });

    function hideActionIcons(){
        this.ui.actionIcons.hide(100);
    }

    function showActionIcons(){
        this.ui.actionIcons.show(100);
    }
});
