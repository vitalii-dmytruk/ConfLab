define([
    'event/details/EventItemListView',
    'common/view/EditView',
    'common/search/SearchView',
    'text!common/view/ItemsInEventTemplate.html',
    'backbone.marionette'
], function EventItemView(EventItemListView, EditView, SearchView, template) {

    //noinspection JSUnusedGlobalSymbols
    return Marionette.LayoutView.extend({
        template: _.template(template),

        ui: {
            newBtn: '#new-button'
        },

        events: {
            'click @ui.newBtn': showCreateView
        },

        regions: {
            selectEventItemRegion: '[data-select-event-item-region]',
            itemListRegion       : '[data-item-list-region]',
            eventItemRegion      : '[data-event-item-region]'
        },

        onBeforeShow: function () {
            this.itemListRegion.show(createListView(this));
            this.selectEventItemRegion.show(createSearchView(this));
        }
    });

    function showCreateView() {
        this.eventItemRegion.show(createEditView(this));
        this.itemListRegion.currentView.deactivateItem();
    }

    function createEditView(view) {
        var createView = new view.options.EditView({
            model: new view.collection.model()
        });

        createView.onSubmit = function (args) {
            addAndSelectItem(view, args.model);
        };
        createView.onCancel = function () {
            view.itemListRegion.currentView.activateItem();
        };

        return createView;
    }

    function createSearchView(view) {
        var searchView = new SearchView({
            model         : new Backbone.Model(),
            labelAttribute: view.options.searchLabelAttribute,
            collection    : view.options.searchCollection
        });

        searchView.onFound = function (model) {
            addAndSelectItem(view, model);
        };
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
        listView.onChildviewDeactivated = function () {
            view.eventItemRegion.empty();
        };

        return listView;
    }

    function showItem(view, model) {
        var options, componentView;

        options = view.options;

        componentView = new options.DetailsView({model: model});
        view.eventItemRegion.show(componentView);

        componentView.showAttachment(new options.attachmentView({
            collection      : getCollection(options, view.model.url() + model.url()),
            searchCollection: getCollection(options, model.url())
        }));
    }

    function addAndSelectItem(view, model) {
        var deferred, collection;

        collection = view.collection;

        if (findItem(collection, model)) {
            deferred = $.Deferred().resolve();
        } else {
            deferred = addItem(model, collection);
        }

        deferred.done(function () {
            selectItem(view, model)
        });
    }

    function addItem(model, collection) {
        model.urlRoot = collection.url;
        return model.save(null, {
            success: function () {
                collection.add(model.clone());
            }
        });
    }

    function selectItem(view, model) {
        var existedItem = findItem(view.collection, model);

        if (existedItem) {
            view.itemListRegion.currentView.activateItem(existedItem);
        } else {
            console.error("Model " + model + " not found.");
        }
    }


    function findItem(collection, model) {
        return collection.get(model.get('id'))
    }

    function getCollection(options, url) {
        var collection = new options.attachedCollectionType();
        collection.url = url + collection.url;
        collection.fetch();
        return collection;
    }
});