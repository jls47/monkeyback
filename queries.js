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
};

getAllSongs = (req, res, next) => {
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

getOneSong = (req, res, next) => {
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

getSongsByArtist = (req, res, next) => {
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

getAllArtists = (req, res, next) => {
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

getArtistsByGenre = (req, res, next) => {
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

getSongsByGenre = (req, res, next) => {
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

addSong = (req, res, next) => {
	console.dir(req.body);
	db.none(`insert into songs(title, artist, genre) values('`+req.body.title+`', '`+req.body.artist+`', '`+req.body.genre+`')`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					message: 'post successful'
				})
		})
		.catch(err +> {
			return next(err);
		})
}

addArtist = (name, genre) => {
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

addGenreToArtist = (name, genre) => {
	db.none(``)
}

getArtistsBySearch = (req, res, next) => {
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

getSongsBySearch = (req, res, next) => {
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

editSong = (req, res, next) => {

}