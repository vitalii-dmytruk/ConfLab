define([
    'common/behavior/SearchBehavior',
    'common/view/EditView',
    'common/view/DetailsView',
    'common/view/RowView',
    'common/view/TableView',
    'text!common/view/ItemsInEventTemplate.html',
    'common/navigation/NavigationItemView',
    'common/navigation/NavigationView',
    'common/search/SearchView',
    'backbone.marionette',
    'backbone.stickit'
], function (SearchBehavior, EditView, DetailsView, RowView, TableView, ItemsInEventTemplate, NavigationItemView,
    NavigationView, SearchView) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            var factory               = this;
            this.itemRowTemplate      = options.itemRowTemplate;
            this.itemShowTemplate     = options.itemShowTemplate;
            this.itemEditTemplate     = options.itemEditTemplate;
            this.bindings             = options.bindings;
            this.rowBindings          = options.rowBindings;
            this.title                = options.title;
            this.tableTitle           = options.tableTitle;
            this.searchLabelAttribute = options.searchLabelAttribute;

            this.itemEditView = EditView.extend({
                template: _.template(this.itemEditTemplate),
                bindings: this.bindings
            });

            this.itemShowView = this.itemEditView.extend({
                template: _.template(this.itemShowTemplate)
            });

            this.itemAttachView = this.itemEditView.extend({
                behaviors: {
                    search: {
                        behaviorClass : SearchBehavior,
                        labelAttribute: this.searchLabelAttribute
                    }
                }
            });

            this.itemDetailsView = DetailsView.extend({
                title   : this.title,
                EditView: this.itemEditView,
                ShowView: this.itemShowView
            });

            this.itemRowView = RowView.extend({
                template: _.template(this.itemRowTemplate),
                bindings: this.rowBindings
            });

            this.itemTableView = TableView.extend({
                title   : this.tableTitle,
                RowView : this.itemRowView,
                EditView: this.itemEditView
            });

            this.attachedItemTableView = this.itemTableView.extend({
                EditView: this.itemAttachView,
                editView: function () {
                    var model = new this.collection.model();

                    model.urlRoot = this.collection.url;

                    return new this.EditView({
                        model     : model,
                        collection: this.options.searchCollection
                    });
                }
            });

            this.listItemView = NavigationItemView.extend({
                template: _.template('<a href="#"></a>'),

                bindings: {
                    'a': this.searchLabelAttribute
                },

                triggers: {
                    'click a': 'item:clicked'
                },

                onRender: function () {
                    this.stickit();
                }

            });

            this.eventItemsView = NavigationView.extend({
                childView: this.listItemView,
                className: 'nav nav-pills nav-stacked',

                childEvents: {
                    'item:clicked': 'onItemClicked'
                },

                onItemClicked: function (view) {
                    var item = view.model;
                    this.activateItem(item);
                    this.options.onItemSelected(item);
                }
            });

            this.itemsInEventView = Marionette.LayoutView.extend({
                template: _.template(ItemsInEventTemplate),

                regions: {
                    selectEventItemRegion: '[data-select-event-item-region]',
                    eventItemsRegion     : '[data-event-items-region]',
                    eventItemRegion      : '[data-event-item-region]'
                },

                onBeforeShow: function () {
                    this.eventItemsRegion.show(new factory.eventItemsView({
                        collection    : this.collection,
                        onItemSelected: this.showItem.bind(this)
                    }));
                    this.selectEventItemRegion.show(new SearchView({
                        model         : new Backbone.Model(),
                        collection    : this.options.searchCollection,
                        labelAttribute: factory.searchLabelAttribute,
                        onItemSelected: this.addAndSelectItem.bind(this)
                    }));
                },

                showItem: function (item) {
                    this.eventItemRegion.show(new factory.itemShowView({model: item}));
                },

                addAndSelectItem: function (model) {
                    var view         = this,
                        existedModel = this.collection.get(model.get('id'));

                    if (!existedModel) {
                        model.urlRoot = this.collection.url;
                        model.save(null, {
                            dataType: 'html',
                            success : function () {
                                view.collection.add(model);
                                view.selectItem(model);
                            }
                        });
                    } else {
                        this.selectItem(existedModel)
                    }
                },

                selectItem: function(item){
                    this.eventItemsRegion.currentView.activateItem(item);
                    this.showItem(item);
                }
            });
        }
    });

});