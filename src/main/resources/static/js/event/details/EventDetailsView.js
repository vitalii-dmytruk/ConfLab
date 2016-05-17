define([
    'text!event/details/EventDetailsTemplate.html',
    'common/navigation/NavigationView',
    'backbone.marionette',
    'backbone.stickit'
], function (template, NavigationView) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        bindings: {
            '#page-title': 'name'
        },

        regions: {
            tabsRegion      : '[data-tabs-region]',
            currentTabRegion: '[data-current-tab-region]'
        },

        modelEvents: {
            'change:id': resetTabs
        },

        initialize: function () {
            this.tabs = new NavigationView({className: 'nav nav-tabs'});
            this.tabs.addItems(initTabs(this, this.model.get('id')));
        },

        onRender: function () {
            this.stickit();
        },

        onBeforeShow: function () {
            this.tabsRegion.show(this.tabs)
        },

        showInfoTab: function (view) {
            this.tabs.activateItem(this.infoTab);
            this.currentTabRegion.show(view);
        },

        showSpeakersTab: function (view) {
            this.tabs.activateItem(this.speakersTab);
            this.currentTabRegion.show(view);
        },

        showSpeechesTab: function (view) {
            this.tabs.activateItem(this.speechesTab);
            this.currentTabRegion.show(view);
        },

        showPartnersTab: function (view) {
            this.tabs.activateItem(this.partnersTab);
            this.currentTabRegion.show(view);
        },

        showScheduleTab: function(view){
            this.tabs.activateItem(this.scheduleTab);
            this.currentTabRegion.show(view);
        },

        showTracksTab: function (view) {
            this.tabs.activateItem(this.tracksTab);
            this.currentTabRegion.show(view);
        }
    });

    function resetTabs(model) {
        this.tabs.resetItems(initTabs(this, model.get('id')));
    }

    function initTabs(view, eventId) {
        view.infoTab     = createTabModel(eventId, 'Info', '/info');
        view.speakersTab = createTabModel(eventId, 'Speakers', '/speakers');
        view.speechesTab = createTabModel(eventId, 'Speeches', '/speeches');
        view.partnersTab = createTabModel(eventId, 'Partners', '/partners');
        view.scheduleTab = createTabModel(eventId, 'Schedule', '/schedule');
        view.tracksTab   = createTabModel(eventId, 'Tracks', '/tracks');

        return [view.infoTab,
                view.speakersTab,
                view.speechesTab,
                view.partnersTab,
                view.scheduleTab,
                view.tracksTab];
    }

    function createTabModel(eventId, name, path) {
        return new Backbone.Model({
            name: name,
            path: 'events/' + eventId + path
        });
    }

});