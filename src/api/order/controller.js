
const { success, fail } = global.brRobotics.get('utils.request')
var mongoose = require('mongoose');

module.exports = {
    setOrder: function (req, res) {
        console.log('setOrder: ' + JSON.stringify(req.body));

        req.body.items.forEach(element => {
            console.log(element)
        });

        mongoose.model('Order').create(req.body.items[0]).then(function (resp) {
            console.log("resp: "+resp);
            res.status(201).send({ status: resp });
            return;
        }, function (error) {
            console.log(error);
            res.status(500).send({ status: error });
            return;
        });
    },

    delOrder: function (req, res) {
        const { id } = req.matchedData

        console.log('delOrder: ' + JSON.stringify(req.body));
        mongoose.model('Order').findByIdAndRemove(req.body.id).then(function (resp) {
            console.log("resp: "+resp);
            res.status(200).send({ status: resp });
            return;
        }, function (error) {
            console.log(error);
            res.status(500).send({ status: error });
            return;
        });
    }
}