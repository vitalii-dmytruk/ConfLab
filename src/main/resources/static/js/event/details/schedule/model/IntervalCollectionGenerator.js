define([
    'event/details/schedule/model/RowAxisCollection',
    'moment'
], function (RowAxisCollection, moment) {

    return {
        generate: function (options) {
            var rowAxisCollection = new RowAxisCollection(),
                period            = options.period,
                from              = moment(options.from),
                to                = moment(options.to),
                count             = to.diff(from, 'minutes') / period;

            var offset, i, axisDate;
            for (i = 0; i <= count; i++) {
                offset   = i * period;
                axisDate = moment(from).add(offset, 'm').toDate();

                rowAxisCollection.push({time: axisDate});
            }
            return rowAxisCollection
        }
    };
});