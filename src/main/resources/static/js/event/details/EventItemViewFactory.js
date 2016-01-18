define([
    'common/view/ItemViewFactory',
    'event/details/EventItemView'
], function EventItemViewFactory(ItemViewFactory, EventItemView) {

    return ItemViewFactory.extend({

        newEventView: function (options) {

            return new EventItemView(_.extend({
                attachedCollectionType: this.options.attachedCollectionType,
                searchLabelAttribute  : this.options.searchLabelAttribute,
                DetailsView           : this.itemDetailsView,
                EditView              : this.itemEditView
            }, options));
        }
    });
});