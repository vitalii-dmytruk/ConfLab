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

        editView.onSubmit = saveModel.bind(this);
        editView.onCancel = hideView;

        this.editRegion.show(editView);
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }

    function saveModel(args) {
        args.model.save(null, {
            wait    : true,
            dataType: args.model.get('id') ? 'html' : 'json',
            success : cleanupAfterEdit.bind(this, args)
        });
    }

    function cleanupAfterEdit(args) {
        this.collection.add(args.model.attributes);
        hideView(args);
    }

    function hideView(args) {
        args.view.destroy();
    }
});