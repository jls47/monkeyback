const promise = require('bluebird');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://vuwumxkxalrbzq:b711534d337515a892fb006d00d28d9e4b7ea23b7beea0a0a29f82dfc0f85183@ec2-174-129-10-235.compute-1.amazonaws.com:5432/datgbuhvg1etav';
//const connectionString = 'postgres://monkey:monkey@localhost:5432/songs'
const db = pgp(connectionString);

module.exports = {
	getMostRecentSongs: getMostRecentSongs,
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

//GET EDITING GOING

function getMostRecentSongs(req, res, next){
	db.any(`select * from songs order by id desc limit 10`)
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

//KEEP THIS ONE FOR THE DAMN EDIT FUNCTION

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
	let songs = JSON.parse(req.body.data);
	console.log(songs);
	let statuses = [];
	for(item in songs){
		let data = songs[item];
		
		db.any(`select * from songs where title = '` + data.title+`' and artist = '`+data.artist+`'`)
			.then(returned => {
				if(returned.length == 0){
					console.log(data.title + " " + data.artist);
					addSong(res, next, data.title, data.artist);
					statuses.push({title: 'Added'})
				}else{
					statuses.push({title: 'Already exists'})
				}
			})
			.catch(err => {
				statuses.push({title: err});
			})
	}
	res.status(200)
		.json(statuses);
	

}

function addSong (res, next, title, artist){
	console.log(title + " adding " + artist)
	db.none(`insert into songs(title, artist) values('`+title+`', '`+artist+`')`)
		.then(data => {
			//do something with the response status
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
		db.result(`delete from songs where id = ` + id)
			.then((result) => {
				console.log({id: 'Song removed'});
			})
			.catch((err) => {
				console.log({id: err});
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
			checkArtistHasSongs(data[0].artist, id);
		})
		.catch(err => {
			return next(err);
		})
}

function removeArtist (artist){
	statuses = [];
	db.result(`delete from artists where name = '`+artist+`'`)
		.then(result => {
			console.log("Removing artist: " + artist);
			statuses.push({artist: 'artist removed'});
		})
		.catch(err => {
			statuses.push({artist: err});
		})
}

//refactor at some point into the other function
function checkArtistHasSongs(artist){
	db.any(`select * from songs where artist = '` + artist + `'`)
		.then(data => {
			console.log("Checking");
			console.log(data);
			if(data.length < 1){
				removeArtist(artist);
			}
		})
		.catch(err => {
			return next(err);
		})
}

function checkBlankArtists(){
	db.any(`select * from artists`)
		.then(data => {
			console.log(data);
			for(item in data){
				checkArtistHasSongs(data[item].name);
			}
		})
		.catch(err => {
			console.log(err);
		})
}

setInterval(function(){checkBlankArtists()}, 60 * 60 * 1000);
//Every hour, checks for blank artists and erases them.