define([
    'common/navigation/NavigationRoute',
    'event/details/ModelManagementLayoutView'
], function (NavigationRoute, ModelManagementLayoutView) {

    'use strict';

    return NavigationRoute.extend({

        constructor: function (options) {
            NavigationRoute.apply(this, arguments);
            this.layoutView = new ModelManagementLayoutView();
            this.layoutView.on('create:new', showCreateView, this);
            options.container.show(this.layoutView);

            this.navsRegion       = this.layoutView.getRegion('itemsListRegion');
            this.currentNavRegion = this.layoutView.getRegion('currentItemRegion');
            this.searchRegion     = this.layoutView.getRegion('searchItemRegion');
        },

        create: function (model) {
            return model.save();
        },

        getCreationView: function () {

        }
    });

    function showCreateView() {
        var creationView = this.getCreationView(),
            self         = this;

        creationView.onSubmit = function (args) {
            addAndSelectItem(self, args.model);
        };

        creationView.onCancel = function () {
            var prev = self.navsView.previousActive;
            prev ? self.select(prev.model) : self.currentNavRegion.empty();
        };

        this.navsView.deactivateItem();
        this.currentNavRegion.show(creationView);
    }

    function addAndSelectItem(view, model) {
        view.create(model).done(function () {
            view.navsCollection.add(model);
            view.select(model);
        });
    }

});