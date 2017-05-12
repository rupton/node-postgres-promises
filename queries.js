var promise = require('bluebird');

var options = {
	promiseLib:promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/puppies';
console.log(connectionString);
var db = pgp(connectionString);

//add query functions

module.exports = {
	getAllPuppies: getAllPuppies,
	//getSinglePuppy: getSinglePuppy,
	//createPuppy: createPuppy,
	//updatePuppy: updatePuppy,
	//removePuppy: removePuppy
};
function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}