define([
    'common/route/Route',
    'event/details/schedule/view/GridstackView',
    'text!event/details/schedule/template/SpeechScheduleTemplate.html'
], function FreeSpeechesRoute(Route, GridstackView, SpeechScheduleTemplate) {

    'use strict';

    return Route.extend({

        render: function () {
            this.gridstackView = new GridstackView({
                cellHeight    : 40,
                verticalMargin: 5,
                width         : 1
            });

            this.options.container.show(this.gridstackView);
        },

        onChange: function (cb) {
            this.gridstackView.on('gridstack:change', cb);
        },

        showSpeeches: function (speeches) {
            speeches.each(function (speech, i) {
                var el = $(_.template(SpeechScheduleTemplate)({title: speech.get('title')}));
                this.gridstackView.addWidget(el, 0, i, 1, 1,
                                             undefined, undefined, undefined, undefined, undefined, speech.get('id'));
            }, this);
        }
    });
});