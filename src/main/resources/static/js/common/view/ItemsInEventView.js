define([
    'common/navigation/NavigationView',
    'text!common/view/ItemInEventTemplate.html',
    'text!common/view/ItemsInEventTemplate.html',
    'backbone.marionette'
], function (NavigationView, ItemInEventTemplate, ItemsInEventTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({
        template: _.template(ItemsInEventTemplate),

        regions: {
            eventItemsRegion: '[data-event-items-region]',
            eventItemRegion : '[data-event-item-region]'
        },

        onBeforeShow: function () {
            var itemsView = NavigationView.extend({

                childView  : Marionette.ItemView.extend({
                    template: _.template(ItemInEventTemplate),
                    ui      : {
                        item: 'div'
                    },
                    triggers: {
                        'click @ui.item': 'item:selected'
                    },
                    onItemSelected: function(){
                        console.log('item');
                    }
                }),
                childEvents: {
                    'item:selected': function (childView) {
                        console.log(childView.model.attributes);
                    }
                }
            });
            this.eventItemsRegion.show(new itemsView( {collection: this.collection}));
        }

    });
});