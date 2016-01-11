define([
    'text!common/view/TableTemplate.html',
    'common/search/SearchView',
    'backbone.marionette'
], function (template, SearchView) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title : '#table-title',
            addBtn: '#add-button'
        },

        events: {
            'click @ui.addBtn': showEditView
        },

        regions: {
            editRegion      : '#edit-region',
            listRegion      : '#list-region',
            selectItemRegion: '[data-select-item-region]'
        },

        onBeforeShow: function () {
            setPageTitle(this);
            this.listRegion.show(new Marionette.CollectionView({
                childView : this.RowView,
                collection: this.collection
            }));
            if (this.options.searchCollection) {
                this.selectItemRegion.show(createSearchView(this));
            }
        }

    });

    function showEditView() {
        var editView = createEditView(this);
        this.editRegion.show(editView);
    }

    function createSearchView(view) {
        var searchView = new SearchView({
            model         : new Backbone.Model(),
            labelAttribute: view.searchLabelAttribute,
            collection    : view.options.searchCollection
        });

        searchView.onFound = function (model) {
            addItemIfNotExist(view, model);
        };
        return searchView;
    }

    function createEditView(view) {
        var editView = new view.EditView({
            model: new view.collection.model()
        });

        editView.onSubmit = function (args) {
            addItemIfNotExist(view, args.model)
        };
        editView.onCancel = function () {
            hideEditView(view);
        };
        return editView;
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }

    function addItemIfNotExist(view, model) {
        var deferred, id;

        id       = model.get('id');
        deferred = view.collection.find({id: id}) ?
                   $.Deferred().resolve() :
                   addModel(model, view.collection);
        deferred.done(function(){
            hideEditView(view)
        });
    }

    function addModel(model, collection) {
        model.urlRoot = collection.url;
        return model.save(null, {
            wait   : true,
            success: function () {
                collection.add(model.clone());
            }
        });
    }

    function hideEditView(view) {
        view.editRegion.empty();
    }
});