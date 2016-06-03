define([
    'common/route/Route',
    'common/view/ListView'
], function ListController(Route, ListView) {

    'use strict';

    return Route.extend({

        props: [
            'container', 'rowView', 'collection', 'collectionClass', 'title', 'EditView'
        ],

        constructor: function (options) {
            this.mergeOptions(options, this.props)
        },

        fetch: function () {
            if (this.collectionClass && !this.collection) {
                this.collection = new this.collectionClass();
                return this.collection.fetch({reset: true});
            }
        },

        render: function () {
            var listView    = new ListView();
            this.editRegion = listView.editRegion;

            this.container.show(listView);

            listView.showTitle(this.title);
            listView.showChildView('listRegion', createCollectionView(this.collection, this.rowView));

            if (this.EditView) {
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
        var collection = this.collection,
            editRegion = this.editRegion;

        var editView = new this.EditView({
            model: new this.collection.model()
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