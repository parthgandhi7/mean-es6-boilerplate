/* globals exp */
"use strict"
const mongoose = exp.mongoose;

const birdsSchema = mongoose.Schema({
  name: String,
  legs: Number
});

birdsSchema.statics.findByName = (name, cb)  => {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Birds = mongoose.model('Birds', birdsSchema);
if (!global.exp.models) {
  global.exp.models = {};
}

global.exp.models.Birds = Birds;
