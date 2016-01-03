define([
    'event/details/EventItemListView',
    'common/view/EditView',
    'common/search/SearchView',
    'speaker/speakerViewFactory',
    'text!common/view/ItemsInEventTemplate.html',
    'backbone.marionette'
], function EventItemDetailedView(EventItemListView, EditView, SearchView, speakerFactory, template) {

    //noinspection JSUnusedGlobalSymbols
    return Marionette.LayoutView.extend({
        template: _.template(template),

        regions: {
            selectEventItemRegion: '[data-select-event-item-region]',
            itemListRegion       : '[data-item-list-region]',
            eventItemRegion      : '[data-event-item-region]'
        },

        onChildviewActivated: function (view) {
            showItem(this, view.model);
        },

        onBeforeShow: function () {
            this.showChildView('itemListRegion', createListView(this));
            this.showChildView('selectEventItemRegion', createSearchView(this));
        },

        findItem: function (model) {
            return this.collection.get(model.get('id'))
        },

        addAndSelectItem: function (model) {
            var deferred;

            if (this.findItem(model)) {
                deferred = $.Deferred().resolve();
            } else {
                deferred = this.addItem(model, this.collection.url);
            }

            deferred.done(this.selectItem.bind(this, model));
        },

        addItem: function (model, url) {
            var view      = this;
            model.urlRoot = url;
            return model.save(null, {
                dataType: 'html',
                success : function () {
                    view.collection.add(model.clone());
                }
            });
        },

        selectItem: function (model) {
            var existedItem = this.findItem(model);

            if (existedItem) {
                this.getRegion('itemListRegion').currentView.activateItem(existedItem);
                showItem(this, existedItem);
            } else {
                console.error("Model " + model + " not found.");
            }
        }
    });

    function createSearchView(view) {
        return new SearchView({
            model         : new Backbone.Model(),
            labelAttribute: view.options.searchLabelAttribute,
            collection    : view.options.searchCollection,
            onItemSelected: view.addAndSelectItem.bind(view)
        });
    }

    function createListView(view) {
        return new EventItemListView({
            collection          : view.collection,
            childViewOptions    : {
                labelAttribute: view.options.searchLabelAttribute
            }
        });
    }

    function showItem(view, model) {
        var componentView = new view.options.detailsView({model: model});
        view.showChildView('eventItemRegion', componentView);
    }
});