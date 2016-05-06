define([
    'text!common/view/DetailsTemplate.html',
    'backbone.marionette'
], function DetailsView(template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        regions: {
            content   : '[data-content-region]',
            attachment: '[data-attachment-region]'
        },

        onChildviewEdit: showEditView,
        onBeforeShow   : showShowView,

        saveModel: function (model) {
            var view = this;

            return model.save(null, {
                success: function () {
                    view.model.set(model.attributes);
                }
            });
        },

        showAttachment: function (view) {
            this.showChildView('attachment', view);
        }
    });

    function showEditView() {
        var view, contentView;

        view = this;

        contentView = new this.EditView({
            model: this.model.clone()
        });

        contentView.onSubmit = save.bind(view);
        contentView.onCancel = showShowView.bind(view);

        this.getRegion('content').show(contentView);
    }

    function save(args) {
        this.saveModel(args.model).done(showShowView.bind(this));
    }


    function showShowView() {
        this.getRegion('content').show(new this.ShowView({
            model: this.model
        }));
    }
});