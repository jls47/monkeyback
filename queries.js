const promise = require('bluebird');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
//const connectionString = 'postgres://vuwumxkxalrbzq:b711534d337515a892fb006d00d28d9e4b7ea23b7beea0a0a29f82dfc0f85183@ec2-174-129-10-235.compute-1.amazonaws.com:5432/datgbuhvg1etav';
const connectionString = 'postgres://monkey:monkey@localhost:5432/songs'
const db = pgp(connectionString);

module.exports = {
	getAllSongs: getAllSongs,
	getOneSong: getOneSong,
	getSongsByArtist: getSongsByArtist,
	getSongsByGenre: getSongsByGenre,
	getAllArtists: getAllArtists,
	getArtistsByGenre: getArtistsByGenre,
	addSong: addSong,
	getArtistsBySearch: getArtistsBySearch,
	getSongsBySearch: getSongsBySearch,
	editSong: editSong
	checkGenre: checkGenre,
	addGenreToArtist: addGenreToArtist,
	removeSong: removeSong,
	removeArtist: removeArtist,
	removeAristGenre: removeArtistGenre

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

function getArtistsByGenre (req, res, next) {
	let genre = req.params.genre;
	db.any(`select * from artists where genre = ` + genre)
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

function getSongsByGenre  (req, res, next){
	let genre = req.params.genre;
	db.any(`select * from songs where genre = ` + genre)
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

function addSong (req, res, next){
	console.dir(req.body);
	db.none(`insert into songs(title, artist, genre) values('`+req.body.title+`', '`+req.body.artist+`', '`+req.body.genre+`')`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					message: 'post successful'
				})
			checkArtist(req.body.artist, req.body.genre);
			
		})
		.catch(err => {
			return next(err);
		})
}

function checkArtist (name, genre) {
	console.log(name);
	db.any(`select * from artists where name = ` + name)
		.then(data => {
			present = true;
			console.dir(data);
			console.log('present');
		})
		.catch(err => {
			console.log('nope')
			addArtist(name, genre);
		})
}

function addArtist (name, genre) {
	db.none(`insert into artists(name, genre) values ('`+name+`', '`+genre+`')`)
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

function editSong (req, res, next) {

}

function checkGenre (artist, genre) {
	db.any(`select * from artists`)
}

function addGenreToArtist (name, genre, genreList) {
	db.none(`update artists set genre = ` + genreList)

}

function removeSong (req, res, next){

}

function removeArtistGenre (artist, genre){
	
}