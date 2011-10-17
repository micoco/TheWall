module.exports = (function() {
  return new function() {
    var self      = this,

        fs        = require('fs'),

        clients   = require('../models/clients'),
        messages  = require('../models/messages');

    this.index = function(req, res) {
      if (!req.session.hasOwnProperty('clientId')) {
        req.session.clientId = clients.getUniqueId();
      }

      res.render('index', {
        as: global,
        client: {
          name: clients.getClientMeta(req.session.clientId, 'name'),
          hash: clients.getClientMeta(req.session.clientId, 'gravatar')
        },
        messages:         messages.getMessages(),
        clients:          clients.getClientsWithMeta('name'),
        includeTemplate:  includeTemplate
      });
    };

    this.message = function(req, res) {
      var id = req.param('id');

      if ((id - 0) == id && id.length > 0) {
        res.render('message', {
          message: messages.getMessage(id)
        });
      }
    };

    this.edit = function(req, res) {
      res.render('edit');
    };

    function includeTemplate(name) {
      return fs.readFileSync(name, 'utf8');
    }
  };
})();