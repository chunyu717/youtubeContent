// var mongoose = require('mongoose')
// var Schema = mongoose.Schema

// module.exports = mongoose.model('ReviewCount', new Schema({
//   reviewcount: Number,
//   date: Number
//   //reviewcount: {type:Number, default:0},
//   //date: {type:Number, default:0}
//   //date: { type: Date, default: Date.now }
// }))


//sequelize
module.exports = (sequelize, type) => {
  return sequelize.define('review', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      reviewcount: {
        type: type.INTEGER,
        //primaryKey: true//,
        //autoIncrement: true
      },
      timestamp: 'TIMESTAMP'
  }, {freezeTableName: true, 
      timestamps: false })
}