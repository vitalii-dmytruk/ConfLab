define([
    'common/route/Route',
    'event/details/schedule/view/GridstackView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html'
], function FreeSpeechesRoute(Route, GridstackView, SpeechScheduleTemplate) {

    'use strict';

    return Route.extend({

        render: function () {
            var speechesView = new GridstackView({
                cellHeight    : this.options.cellHeight,
                verticalMargin: this.options.cellMargin,
                minRowsCount  : 1,
                width         : 1
            });

            this.options.container.show(speechesView);

            this.options.speeches.each(function (speech, i) {
                var el = $(_.template(SpeechScheduleTemplate)({title: speech.get('title')}));
                speechesView.addWidget(el, 0, i, 1, 1,
                                       undefined, undefined, undefined, undefined, undefined, speech.get('id'));
            });

            speechesView.on('gridstack:change', updateSpeech.bind(null, this.options.speeches));
        }
    });

    function updateSpeech(speeches, event, items) {
        items.forEach(function (item) {
            var id     = item.el.attr('data-gs-id');
            var speech = speeches.get(id);
            speech.set('track', null);
            speech.set('position', null);
            speech.set('duration', null);

            if (item.height > 1 || item.width > 1) {
                item._grid.resize(item.el, 1, 1);
            }
        });
    }
});