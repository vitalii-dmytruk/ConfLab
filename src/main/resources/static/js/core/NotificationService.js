define([
    'common/Service',
    'core/Notification'
], function NotificationService(Service, Notification) {
    'use strict';

    return Service.extend({
        channelName : 'notify',

        onStart : function () {
            this.channel.reply(new Notification())
        },

        onStop : function () {
            this.channel.stopReplying();
        }
    });
});