define([
    'text!common/view/TableTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title : '#table-title',
            addBtn: '#add-button'
        },

        events: {
            'click @ui.addBtn': showAddItemView
        },

        regions: {
            editRegion: '#edit-region',
            listRegion: '#list-region'
        },

        onRender: function () {
            setPageTitle(this);
            this.listRegion.show(new Marionette.CollectionView({
                childView : this.RowView,
                collection: this.collection
            }));
        },

        editView: function () {
            return new this.EditView({
                model: new this.collection.model()
            });
        }

    });

    function showAddItemView() {
        var editView = this.editView();

        editView.onSubmit = submitModel.bind(this);
        editView.onCancel = hideView.bind(this);

        this.editRegion.show(editView);
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }

    function isSaved(deferred) {
        return !!deferred;
    }

    function submitModel(args) {
        var deferred, id;

        id       = args.model.get('id');
        deferred = this.collection.find({id: id}) ? false : addModel(args.model, this.collection);
        isSaved(deferred) && deferred.done(hideView.bind(this));
    }

    function addModel(model, collection) {
        return model.save(null, {
            wait   : true,
            success: function () {
                collection.add(model);
            }
        });
    }

    function hideView() {
        this.editRegion.empty();
    }
});