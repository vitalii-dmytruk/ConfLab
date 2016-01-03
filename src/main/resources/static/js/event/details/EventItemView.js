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

        onBeforeShow: function () {
            this.showChildView('itemListRegion', createListView(this));
            this.showChildView('selectEventItemRegion', createSearchView(this));
        }
    });

    function createSearchView(view) {
        var searchView = new SearchView({
            model         : new Backbone.Model(),
            labelAttribute: view.options.searchLabelAttribute,
            collection    : view.options.searchCollection
        });

        searchView.onFound = addAndSelectItem.bind(view);
        return searchView;
    }

    function createListView(view) {
        var listView = new EventItemListView({
            collection      : view.collection,
            childViewOptions: {
                labelAttribute: view.options.searchLabelAttribute
            }
        });

        listView.onChildviewActivated = function (child) {
            showItem(view, child.model);
        };

        return listView;
    }

    function showItem(view, model) {
        var componentView = new view.options.detailsView({model: model});
        view.showChildView('eventItemRegion', componentView);
    }

    function addAndSelectItem(model) {
        var deferred;

        if (findItem(this, model)) {
            deferred = $.Deferred().resolve();
        } else {
            deferred = addItem(model, this.collection);
        }

        deferred.done(selectItem.bind(this, model));
    }

    function addItem(model, collection) {
        model.urlRoot = collection.url;
        return model.save(null, {
            dataType: 'html',
            success : function () {
                collection.add(model.clone());
            }
        });
    }

    function selectItem(model) {
        var existedItem = findItem(this, model);

        if (existedItem) {
            this.getRegion('itemListRegion').currentView.activateItem(existedItem);
            showItem(this, existedItem);
        } else {
            console.error("Model " + model + " not found.");
        }
    }

    function findItem(view, model) {
        return view.collection.get(model.get('id'))
    }
});