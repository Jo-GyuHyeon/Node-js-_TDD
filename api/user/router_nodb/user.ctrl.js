//api 로직

// var users = [
//   { id: 1, name: 'jo1' },
//   { id: 2, name: 'jo2' },
//   { id: 3, name: 'jo3' }
// ];

const models = require('../../models');

const index = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  models.User.findAll({limit:limit})
    .then(users => {
      res.json(users);
    });

  // res.json(users.slice(0, limit));
}

const show = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end()
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
}

const destroy = function (req, res) {
  const id = parseInt(req.param.id, 10);
  if (Number.isNaN(id)) return res.status(400)
  users = users.filter(user => user.id !== id);
  res.status(204).end();
}

const create = (req, res) => {
  const name = req.body.name
  if (!name) return res.status(400).end();
  const isConfilct = users.filter(user => user.name === name).length;
  if (isConfilct) return res.status(409).end();
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
}

const update = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConfilct = users.filter(user => user.name === name).length;
  if (isConfilct) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();

  user.name = name;
  console.log(user)

  res.json(user);
}

module.exports = {
  index: index,
  show: show,
  destroy: destroy,
  create: create,
  update: update
};
