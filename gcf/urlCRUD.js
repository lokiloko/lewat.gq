var randomstring = require('randomstring')
var mongoose = require('mongoose');
require('dotenv').config()
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI)
var urlSchema = new Schema({
   full_url: {
      type: String,
      required: true
   },
   short_url: {
      type: String,
      required: true
   }
},{
   timestamps: true
});

var Url = mongoose.model('Url', urlSchema);

class Model {
   static readOne(short_url) {
      return new Promise((resolve, reject) => {
         Url.findOne({
            "short_url": short_url
         }).then((data) => {
            resolve(data)
         }).catch((err) => {
            reject(err)
         })
      })
   }
   static create(insert) {
      return new Promise((resolve, reject) => {
         let generatedShortUrl = randomstring.generate(4)
         Url.create({
            full_url: insert.full_url,
            short_url: generatedShortUrl,
         }).then((data) => {
            var obj = {
               message: 'Insert Success',
               data: data
            }
            resolve(obj)
         }).catch((err) => {
            reject(err)
         })
      })
   }
}
module.exports = Model;