const mainController = require('../app/mainController');
const roomController = require('../app/roomController');
const ruleController = require('../app/ruleController');
const methodController = require('../app/methodController');
const policyController = require('../app/policyController');

function initRoute(app) {
    app.get('/:password/editor', mainController().index);
    app.post('/setting/word', mainController().word);
    app.post('/setting/add', mainController().add);
    app.post('/setting/update', mainController().update);
    app.post('/setting/delete', mainController().delete);

    app.get('/:password/room', roomController().index);
    app.post('/tournament/add', roomController().add);
    app.post('/tournament/delete', roomController().delete);

    app.get('/:password/rule', ruleController().index);
    app.post('/rule/save', ruleController().save);

    app.get('/:password/method', methodController().index);
    app.post('/method/save', methodController().save);

    app.get('/:password/policy', policyController().index);
    app.post('/policy/save/', policyController().save);
}

module.exports = initRoute;