const findOrCreate = (model, lookup, values) => {
  return new Promise( (resolve, reject) => {
    return model
      .findOneAndUpdate(lookup, {$set: values}, {upsert: true, new: true})
      .exec()
      .then(result => resolve(result))
      .catch(err => reject(err));
  })
}

const deleteRelated = (model, comparison) => {
  return new Promise( (resolve, reject) => {
    return model
      .deleteMany(comparison)
      .exec()
      .then(success => resolve(success))
      .catch(err => reject(err));
  })
}

module.exports = {
  findOrCreate: findOrCreate,
  deleteRelated: deleteRelated
}