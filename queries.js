const promise = require('bluebird');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://vuwumxkxalrbzq:b711534d337515a892fb006d00d28d9e4b7ea23b7beea0a0a29f82dfc0f85183@ec2-174-129-10-235.compute-1.amazonaws.com:5432/datgbuhvg1etav';
//const connectionString = 'postgres://monkey:monkey@localhost:5432/songs'
const db = pgp(connectionString);

module.exports = {
	getAllSongs: getAllSongs,
	getOneSong: getOneSong,
	getSongsByArtist: getSongsByArtist,
	getAllArtists: getAllArtists,
	addSong: addSong,
	checkSong: checkSong,
	getArtistsBySearch: getArtistsBySearch,
	getSongsBySearch: getSongsBySearch,
	editSong: editSong,
	removeSong: removeSong
};

function getAllSongs (req, res, next) {
	db.any(`select * from songs`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

function getOneSong (req, res, next) {
	let Sid = parseInt(req.params.id);
	db.any(`select * from songs where id = ` + Sid)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}


//refactor the other thing into there
function getSongsByArtist (req, res, next) {
	let artist = req.params.artist;
	db.any(`select * from songs where artist = ` + artist)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

function getAllArtists (req, res, next) {
	db.any(`select * from artists`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

//Add song, add artist if not present
//add responses to functions that need it

function checkSong(req, res, next){
	console.dir(req.body);
	console.log(`select * from songs where title = '` + req.body.title+`' and artist = '`+req.body.artist+`'`)
	db.any(`select * from songs where title = '` + req.body.title+`' and artist = '`+req.body.artist+`'`)
		.then(data => {
			if(data.length == 0){
				console.log('wtf')
				addSong(res, next, req.body.title, req.body.artist);
			}else{
				res.status(200)
					.json({
						status: 'nope',
						message: 'duplicate'
					})
			}
		})
		.catch(err => {
			return next(err);
		})

}

function addSong (res, next, title, artist){
	db.none(`insert into songs(title, artist) values('`+title+`', '`+artist+`')`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					message: 'post successful'
				})
			checkArtist(artist);
		})
		.catch(err => {
			return next(err);
		})
}


//Double check that data function.  Allows adding duplicates right now.
function checkArtist (name) {
	console.log(name);
	db.any(`select * from artists where name = '` + name + `'`)
		.then(data => {
			if(data.length == 0){
				addArtist(name);
			}else{
				present = true;
				console.dir(data);
				console.log('present');
			}
		})
		.catch(err => {
			console.log(err)
			return(err);
		})
}

function addArtist (name) {
	db.none(`insert into artists(name) values ('`+name+`')`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					message: 'post successful'
				})
		})
		.catch(err => {
			return err;
		})
}

function getArtistsBySearch (req, res, next) {
	let search = req.params.search;
	db.any(`select * from artists where name ilike '%` + search + `%'`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'search successful'
				})
		})
		.catch(err => {
			return next(err);
		})

}

//add genre list?

function getSongsBySearch (req, res, next) {
	let search = req.params.search;
	db.any(`select * from songs where title ilike '%` + search + `%'`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'search successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

//Do we even need genre stuff?


//if editing in new artist then add artist
//if editing removes an artist then remove artist

function editSong (req, res, next) {
	console.log(req.body);
	console.log(req.params);
	db.none(`update songs set title = '` + req.body.title + `', artist = '` + req.body.artist + `' where id = '` + req.params.id+`'`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					message: 'update successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

//Do find artist by song id then remove?  Shit idk
function removeSong (req, res, next){
	console.log(req.body);
	var statuses = [];
	var pass = 0;
	var ids = req.body.id.split(',');
	for(var id of req.body.id.split(',')){
		console.log(id);
		console.log(`delete from songs where id = ` + id);
		findArtistBySongId(id);
		db.result(`delete from songs where id = ` + id)
			.then((result) => {
				statuses.push({id: 'Song removed'});
			})
			.catch((err) => {
				statuses.push({id: err});
			})
		pass += 1;
		if(pass >= ids.length){
			res.status(200).json(statuses);
		}
	}
}

//maybe if number of songs <= 1?  test!

function findArtistBySongId (id){
	console.log(id);
	db.any(`select * from songs where id = ` + id)
		.then(data => {
			console.log('finding artist');
			console.log(data);
			checkArtistHasSongs(data[0].artist);
		})
		.catch(err => {
			return next(err);
		})
}

function removeArtist (artist){
	statuses = [];
	db.result(`delete from artists where name = '`+artist+`'`)
		.then(result => {
			console.log(result);
			statuses.push({artist: 'artist removed'});
		})
		.catch(err => {
			statuses.push({artist: err});
		})
}

//refactor at some point into the other function
function checkArtistHasSongs(artist){
	console.log(artist);
	db.any(`select * from songs where artist = '` + artist + `'`)
		.then(data => {
			if(data.length <= 1){
				removeArtist(artist);
			}
		})
		.catch(err => {
			return next(err);
		})
}