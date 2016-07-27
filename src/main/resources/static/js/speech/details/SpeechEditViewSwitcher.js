define([
    'common/view/EditViewSwitcherController',
    'speech/speechViewFactory'
], function SpeechEditViewSwitcher(EditViewSwitcherController, speechViewFactory) {

    'use strict';

    return EditViewSwitcherController.extend({
        infoView: speechViewFactory.itemShowView,
        editView: speechViewFactory.itemEditView
    });

});