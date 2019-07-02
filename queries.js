const promise = require('bluebird');
const bcrypt = require('bcrypt');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const cs0 = 'postgres://vuwumxkxalrbzq:b711534d337515a892fb006d00d28d9e4b7ea23b7beea0a0a29f82dfc0f85183@ec2-174-129-10-235.compute-1.amazonaws.com:5432/datgbuhvg1etav';
const cs1 = 'postgres://ruualbbvnlcyjo:fef64ebccd1dd6821e8773af09c8e9e1a92dad51584bb6dbaae14fbbd4b5b270@ec2-174-129-29-101.compute-1.amazonaws.com:5432/d1pqf90fuq8c46';
const cs2 = 'postgres://lmbomgkhybtugl:d7c8f8afb46c9e83c1ef5d2a97ee9554f41284f986c718f87c526872326d17c7@ec2-50-19-221-38.compute-1.amazonaws.com:5432/d8p5bpm6j9bj0q';
const cs3 = 'postgres://vvunoatpwmtfhc:3bad7c7626309d6461387916f9b7da7738b990a01c1037316e738e7b60f42721@ec2-174-129-29-101.compute-1.amazonaws.com:5432/demku8g0oqrsrh';
const cs4 = 'postgres://ejxjjxdudqqvku:b1ada0ccb42c75fe0f53ab63dc41755c4f8d4f833d44e78ceb0f8750563c10e1@ec2-174-129-29-101.compute-1.amazonaws.com:5432/d1lpqv3idv4g2d';
const cs5 = 'postgres://pvpklqppikggwh:336395952ce7d3ee3d5b53b40f9760001cad43ff1f193190b030a47e73fa1284@ec2-174-129-29-101.compute-1.amazonaws.com:5432/de4cvce8djbd4p';
//const connectionString = 'postgres://monkey:monkey@localhost:5432/songs'
const db = pgp(cs0);
const db1 = pgp(cs1);
const db2 = pgp(cs2);
const db3 = pgp(cs3);
const db4 = pgp(cs4);
const db5 = pgp(cs5);


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
	removeSong: removeSong,
	login: login,
	createUser: createUser,
	getSongsByLetter: getSongsByLetter,
	getArtistsByLetter: getArtistsByLetter
};

//GET EDITING GOING

function login(req, res, next){
	db.any(`select * from users where name = '`+req.query.name+`'`)
		.then(data => {
			bcrypt.compare(req.query.password, data[0].password, function(err, resp){
				if(resp){
					res.status(200)
						.json({
							status: 'success',
							message: 'passwords match'
						})
				} else {
					res.status(200)
						.json({
							status: 'failure',
							message: `passwords don't match`
						})
				}
			})
		})
		.catch(function(err){
			return next(err);
		})
}

function createUser(req, res, next){
	console.log(req.body);
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(req.body.password, salt, function(err, hashpass){
			db.any(`insert into users(name, password) values('`+req.body.name+`', '`+hashpass+`')`)
				.then(data => {
					res.status(200)
						.json({
							status: 'success',
							data: data,
							message: 'create successful'
						})
				})
				.catch(e => {
					return next(e);
				})

		});
	})
}

function getMostRecentSongs(req, res, next){
	db.any(`select * from songs order by id desc limit 3`)
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
	db.any(`select * from songs where artist = '` + artist + `'`)
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

function getSongsByLetter(req, res, next){
	let letter = req.params.letter;
	db.any(`select * from songs where lower(title) similar to '(`+letter+`)%'`)
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'found stuff by letter'
				})
		})
		.catch(err => {
			return next(err);
		})
}

function getArtistsByLetter(req, res, next){
	let letter = req.params.letter;
	db.any(`select * from artists where lower(name) similar to '(`+letter+`)%'`)
		.then(data => {
			console.log(data);
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'found stuff by letter'
				})
		})
		.catch(err => {
			return next(err);
		})
}

function getSongsByArtist4Nums (artist) {
	db.any(`select * from songs where artist = '` + artist + `'`)
		.then(data => {
			setSongNums(artist, data.length);
		})
		.catch(err => {
			return next(err);
		})
}

function setSongNums (artist, length){
	db.none(`update artists set numsongs = ` + length + ` where name = '`+artist+`'`)
		.then(data => {
			console.log(data);
		})
}

//Add song, add artist if not present
//add responses to functions that need it

function checkSong(req, res, next){
	console.log('aaa');
	console.log(req.body.data);
	let songs = JSON.parse(req.body.data);
	let artists = [];
	for(item in songs){
		let data = songs[item];
		console.log(data.title.length);
		console.log(data.artist.length);
		if(data.title.length != 0 && data.artist.length != 0){
			if(artists.indexOf(data.artist) == -1 && (data.title.length != 0 && data.artist.length != 0)){
				startCheck(data, db);
			}else{
				checkSongAlt(data, res, next);
			}
			artists.push(data.artist);
		}
		
	}
	res.status(200)
		.json(statuses);
}

function startCheck(data, dbase){
	let statuses = [];
	dbase.any(`select * from songs where title = '` + data.title+`' and artist = '`+data.artist+`'`)
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



function checkSongAlt(data, res, next){
	setTimeout(function(){
		console.log('Deferred single song check');
		db.any(`select * from songs where title = '` + data.title+`' and artist = '`+data.artist+`'`)
		.then(returned => {
			console.log(returned);
			if(returned.length == 0){
				console.log(data.title + " " + data.artist);
				shortAddSong(res, next, data.title, data.artist);
				console.log('adding song');
			}else{
				console.log('song already exists')
			}
		})
		.catch(err => {
			return(err);
		})
	}, 300);
	
}

function shortAddSong(res, next, title, artist){
	db.none(`insert into songs(title, artist) values('`+title+`', '`+artist+`')`)
		.then(data => {
			console.log(data);
			return data;
		})
		.catch( err => {
			return next(err);
		})
}

//Adding more than one song by the same artist creates multiple instances of that artist.  This is a problem.
//Will solve for now by pruning duplicate artists for the time being.
function addSong (res, next, title, artist){
	console.log(title + " adding " + artist);
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
				addSongNum(name);
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
	console.log('Adding ' + name);
	db.none(`insert into artists(name) values ('`+name+`')`)
		.then(data => {
			addSongNum(name);
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

function addSongNum(artist){
	db.none(`update artist set songnum = songnum + 1 where name = '`+artist+`'`)
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

function editSong (req, res, next) {
	let songs = req.body;
	let statuses = [];
	for(item in songs){
		let id = songs[item].id;
		db.none(`update songs set title = '` + songs[item].title + `', artist = '` + songs[item].artist + `', notes='` + songs[item].notes + `' where id = '` + songs[item].id+`'`)
			.then( function() {
				statuses.push({success: id})
				if(statuses.length == songs.length){
					res.status(200)
					.json({
						status: 'success',
						data: statuses,
						message: 'update successful'
					})
				}
			}

			)
			.catch(err => {
				return next(err);
			})
	}
	delayRemove();
	
}

//Do find artist by song id then remove?  Shit idk
function removeSong (req, res, next){
	console.log(req.params.ids);
	var statuses = [];
	var pass = 0;
	var ids = req.params.ids.split(',');
	for(var id of req.params.ids.split(',')){
		console.log(id);
		console.log(`delete from songs where id = ` + id);
		db.result(`delete from songs where id = ` + id)
			.then((result) => {
				statuses.push({removed: id});
			})
			.catch((err) => {
				statuses.push({error: id});
			})
		pass += 1;
		if(pass >= ids.length){
			res.status(200).json(statuses);
		}
	}
	delayRemove();
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
				getSongsByArtist4Nums(data[item].name);
				checkArtistHasSongs(data[item].name);
			}
		})
		.catch(err => {
			console.log(err);
		})

}

function delayRemove(){
	setInterval(function(){
		checkBlankArtists()}
	, 60 * 1000);
}
//Every half hour, checks for blank artists and erases them.


function quickSort(arr) {
  let ppoint = Math.floor(Math.random() * arr.length);
  let pnum = arr[ppoint].numSongs;
  console.log(pnum);
  let left = [];
  let right = [];
  let middle = [];
  for(let i = 0; i < arr.length; i++){
    if(arr[i].numSongs > pnum){
      right.push(arr[i]);
    }else if(arr[i].numSongs < pnum){
      left.push(arr[i]);
    }else{
      middle.push(arr[i]);
    }
  }
  
  if(left.length > 1 && right.length > 1){
    return quickSort(left).concat(middle.concat(quickSort(right)))
  }else if(left.length <= 1 && right.length > 1){
    return left.concat(middle.concat(quickSort(right)))
  }else if(left.length > 1 && right.length <= 1){
    return quickSort(left).concat(middle.concat(right))
  }else{
    return left.concat(middle.concat(right))
  }
}

