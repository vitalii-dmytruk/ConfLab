define([
    'common/route/Route',
    'common/view/ListView'
], function ListController(Route, ListView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.options = options;
        },

        enter: function () {
            var listView    = new ListView();
            this.editRegion = listView.editRegion;

            this.options.container.show(listView);

            listView.showTitle(this.options.title);
            listView.showChildView('listRegion', createCollectionView(this.options.collection,
                                                                      this.options.rowView));
            if (this.options.EditView) {
                listView.supportCreating();
                listView.on('create:new', showEditView, this);
            }
        }
    });

    function createCollectionView(collection, rowView) {
        return new Marionette.CollectionView({
            childView : rowView,
            collection: collection
        });
    }

    function showEditView() {
        var EditView   = this.options.EditView,
            Model      = this.options.collection.model,
            collection = this.options.collection,
            editRegion = this.editRegion;

        var editView = new EditView({
            model: new Model()
        });

        var hideEditView = function () {
            editRegion.empty();
        };

        editView.onSubmit = function (args) {
            addItemIfNotExist(collection, args.model).then(hideEditView);
        };

        editView.onCancel = hideEditView;

        editRegion.show(editView);
    }

    function addItemIfNotExist(collection, model) {
        var deferred, id;

        id       = model.get('id');
        deferred = collection.find({id: id}) ?
                   $.Deferred().resolve() :
                   addModel(model, collection);

        return deferred.promise();
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
});