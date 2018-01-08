var model = require('./urlCRUD')

exports.urlCRUD = function urlCRUD(req, res) {
      switch (req.method) {
         case "GET":
            if (req.query.url) {
               model.readOne(req.query.url).then((data) => {
                  res.status(200).send(data)
               }).catch(err => {
                  res.status(400).send(err)
               })
            } else {
               res.send('Hello World, I love this world')
            }
            break;
         case "POST":
            model.create(req.body).then((data) => {
               res.status(200).send(data)
            }).catch((err) => {
               res.status(400).send(err)
            })
            break;
         default: 
            res.send('Hello World, this world so beautiful')
      }
   }