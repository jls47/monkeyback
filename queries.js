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
const cs4 = 'postgres://osslvrbgpiyfis:5f7f117c7bfbb0461024836071956c226c540424f9ebb9bb9e2dfe18df859bbd@ec2-107-20-185-16.compute-1.amazonaws.com:5432/dbi0i064kohqv6';
const cs5 = 'postgres://pvpklqppikggwh:336395952ce7d3ee3d5b53b40f9760001cad43ff1f193190b030a47e73fa1284@ec2-174-129-29-101.compute-1.amazonaws.com:5432/de4cvce8djbd4p';
const connectionString = 'postgres://monkey:monkey@localhost:5432/songs'
//const db = pgp(connectionString);
const db = pgp(cs0);
const db1 = pgp(cs1);
const db2 = pgp(cs2);
const db3 = pgp(cs3);
const db4 = pgp(cs4);
const db5 = pgp(cs5);

const $p = db.$config.promise;
const $p1 = db1.$config.promise;
const $p2 = db2.$config.promise;
const $p3 = db3.$config.promise;
const $p4 = db4.$config.promise;
const $p5 = db5.$config.promise;

module.exports = {
	getMostRecentSongs: getMostRecentSongs,
	getAllSongs: getAllSongs,
	getAllSongs1: getAllSongs1,
	getSongsByArtist: getSongsByArtist,
	getAllArtists: getAllArtists,
	addSong: addSong,
	checkSong: checkSong,
	checkSong1: checkSong1,
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

function getMostRecentSongs1(req, res, next){
	Promise.all([recents(db), recents(db1), recents(db2), recents(db3), recents(db4), recents(db5)])
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return err;
		})
}

function getMostRecentSongs(req, res, next){
	//concat data with data from other dbs
	dbase.any(`select * from songs order by id desc limit 3`)
		.then(data => {
			//return data;
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return err;
		})
}

function getAllSongs(req, res, next){
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

function getAllSongs1(req, res, next){
	Promise.all([all, all1, all2, all3, all4, all5])
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

const all = $p((resolve, reject) => {
	db.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const all1 = $p1((resolve, reject) => {
	db1.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const all2 = $p2((resolve, reject) => {
	db2.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const all3 = $p3((resolve, reject) => {
	db3.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const all4 = $p4((resolve, reject) => {
	db4.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const all5 = $p5((resolve, reject) => {
	db5.any(`select * from songs`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

function getAll (dbase) {
	//concat data with data from other dbs
	dbase.any(`select * from songs`)
		.then(data => {
			return data;
		})
		.catch(err => {
			return err;
		})
}

//refactor the other thing into there
function getSongsByArtist (req, res, next) {
	//select db depending on artist
	let artist = req.params.artist;
	let dbase;
	let lowArtist = artist.toLowerCase();
	if(lowArtist < "t"){
		dbase = db4;
	}else if(lowArtist < "patty smyth"){
		dbase = db3;
	}else if(lowArtist < "leann rimes"){
		dbase = db2;
	}else if(lowArtist < "h"){
		dbase = db1;
	}else if(lowArtist < "chuck berry"){
		dbase = db;
	}else{
		dbase = db5;
	}

	dbase.any(`select * from songs where artist = '` + artist + `'`)
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
	//concat data with data from other dbs
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
	//concat data with data from other dbs
	let letter = req.params.letter;
	let dbase;
	let lowLet = letter.toLowerCase();
	if(lowLet < "chuck berry"){
		dbase = db;
	}else if(lowLet < "h"){
		dbase = db1;
	}else if(lowLet < "leann rimes"){
		dbase = db2;
	}else if(lowLet < "patty smyth"){
		dbase = db3;
	}else if(lowLet < "t"){
		dbase = db4;
	}else{
		dbase = db5;
	}

	dbase.any(`select * from songs where lower(title) similar to '(`+letter+`)%'`)
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
	//concat data with data from other dbs
	let letter = req.params.letter;
	let dbase;
	let lowLet = letter.toLowerCase();
	if(lowLet < "chuck berry"){
		dbase = db;
	}else if(lowLet < "h"){
		dbase = db1;
	}else if(lowLet < "leann rimes"){
		dbase = db2;
	}else if(lowLet < "patty smyth"){
		dbase = db3;
	}else if(lowLet < "t"){
		dbase = db4;
	}else{
		dbase = db5;
	}
	dbase.any(`select * from artists where lower(name) similar to '(`+letter+`)%'`)
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

function getSongsByArtist4Nums (artist, dbase) {
	//select db based on artist
	dbase.any(`select * from songs where artist = '` + artist + `'`)
		.then(data => {
			setSongNums(artist, data.length, dbase);
		})
		.catch(err => {
			return next(err);
		})
}

function setSongNums (artist, length, dbase){
	//select db based on artist
	dbase.none(`update artists set numsongs = ` + length + ` where name = '`+artist+`'`)
		.then(data => {
			console.log(data);
		})
}

//Add song, add artist if not present
//add responses to functions that need it

function checkSong(req, res, next){

	//concat data with data from other dbs
	let songs = JSON.parse(req.body.data);
	let artists = [];
	for(let item of songs){
		if(item.title.length != 0 && item.artist.length != 0){
			if(artists.indexOf(item.artist) == -1){

				let artistPost = item.artist.indexOf("'");
		        let songPost = item.title.indexOf("'");

		        if(artistPost != -1){
		          item.artist = item.artist.slice(0, artistPost) + "'" + item.artist.slice(artistPost);
		        }

		        if(songPost != -1){
		          item.title = item.title.slice(0, songPost) + "'" + item.title.slice(songPost);
		        }

		        startCheck(res, next, item, db);
		        

			}else{

				let artistPost = item.artist.indexOf("'");
			    let songPost = item.title.indexOf("'");

			    if(artistPost != -1){
			      item.artist = item.artist.slice(0, artistPost) + "'" + item.artist.slice(artistPost);
			    }

			    if(songPost != -1){
			      item.title = item.title.slice(0, songPost) + "'" + item.title.slice(songPost);
			    }

			    checkSongAlt(res, next, item, db);
		        
			}
			artists.push(item.artist);
		}
		
	}
	res.status(200)
		.json({success: 'yes'});
}

function checkSong1(req, res, next){

	//concat data with data from other dbs
	let songs = JSON.parse(req.body.data);
	let artists = [];
	for(let item of songs){
		if(item.title.length != 0 && item.artist.length != 0){
			if(artists.indexOf(item.artist) == -1){
				let artistPost = item.artist.indexOf("'");
		        let songPost = item.title.indexOf("'");
		        if(artistPost != -1){
		          item.artist = item.artist.slice(0, artistPost) + "'" + item.artist.slice(artistPost);
		        }

		        if(songPost != -1){
		          item.title = item.title.slice(0, songPost) + "'" + item.title.slice(songPost);
		        }
		        console.log(item.artist.toLowerCase());
		        if(item.artist.toLowerCase() < 'chuck berry'){
		          console.log('lower than chuck');
		          startCheck(res, next, item, db);
		        }else if(item.artist.toLowerCase() < 'h'){
		          console.log('lower than h');
		          startCheck(res, next, item, db1);
		        }else if(item.artist.toLowerCase() < 'leann rimes'){
		          console.log('lower than leann');
		          startCheck(res, next, item, db2);
		        }else if(item.artist.toLowerCase() < 'patty smyth'){
		          console.log('lower than patty');
		          startCheck(res, next, item, db3);
		        }else if(item.artist.toLowerCase() < 't'){
		          console.log('lower than t');
		          startCheck(res, next, item, db4);
		        }else{
		          console.log('highest');
		          startCheck(res, next, item, db5);
		        }

			}else{
				if(item.artist.toLowerCase() < 'chuck berry'){
				  console.log('lower than chuck');
		          checkSongAlt(res, next, item, db);
		        }else if(item.artist.toLowerCase() < 'h'){
		          console.log('lower than h');
		          checkSongAlt(res, next, item, db1);
		        }else if(item.artist.toLowerCase() < 'leann rimes'){
		          console.log('lower than leann');
		          checkSongAlt(res, next, item, db2);
		        }else if(item.artist.toLowerCase() < 'patty smyth'){
		          console.log('lower than patty');
		          checkSongAlt(res, next, item, db3);
		        }else if(item.artist.toLowerCase() < 't'){
		          console.log('lower than t');
		          checkSongAlt(res, next, item, db4);
		        }else{
		          console.log('highest');
		          checkSongAlt(res, next, item, db5);
		        }
			}
			artists.push(item.artist);
		}
		
	}
	res.status(200)
		.json({
			success: 'yes'
		});
	
}

function startCheck(res, next, data, dbase){
	console.log(dbase);
	var statuses = [];

	dbase.any(`select * from songs where title = '` + data.title+`' and artist = '`+data.artist+`'`)
		.then(returned => {
			console.log(returned);
			if(returned.length == 0){
				console.log(data.title + " " + data.artist);
				//pass dbase along
				addSong(res, next, data.title, data.artist, dbase);
			}else{
				//statuses.push({title: 'Already exists'})
				console.log('song already exists')
			}
		})
	 	.catch(err => {
			statuses.push({title: err});
		})
}



function checkSongAlt(data, res, next, dbase){
	setTimeout(function(){
		console.log('Deferred single song check');
		dbase.any(`select * from songs where title = '` + data.title+`' and artist = '`+data.artist+`'`)
		.then(returned => {
			console.log(returned);
			if(returned.length == 0){
				console.log(data.title + " " + data.artist);
				shortAddSong(res, next, data.title, data.artist, dbase);
				console.log('adding song');
			}else{
				console.log('song already exists')
			}
		})
		.catch(err => {
			return(err);
		})
	}, 500);
	
}

function shortAddSong(res, next, title, artist, dbase){
	dbase.none(`insert into songs(title, artist) values('`+title+`', '`+artist+`')`)
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
function addSong (res, next,  title, artist, dbase){
	console.log(title + " adding " + artist);
	dbase.none(`insert into songs(title, artist) values('`+title+`', '`+artist+`')`)
		.then(data => {
			console.log('song added');
			//do something with the response status
			checkArtist(artist, dbase);
		})
		.catch(err => {
			return next(err);
		})
}


//Double check that data function.  Allows adding duplicates right now.
function checkArtist (name, dbase) {
	console.log(name);
	dbase.any(`select * from artists where name = '` + name + `'`)
		.then(data => {
			if(data.length == 0){
				addArtist(name, dbase);
				
			}else{
				present = true;
				addSongNum(name, dbase);
				console.dir(data);
				console.log('present');
			}
		})
		.catch(err => {
			console.log(err)
			return(err);
		})
}

function addArtist (name, dbase) {
	console.log('Adding ' + name);
	dbase.none(`insert into artists(name) values ('`+name+`')`)
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

function addSongNum(artist, dbase){
	dbase.none(`update artists set numsongs = numsongs + 1 where name = '`+artist+`'`)
}

function getArtistsBySearch (req, res, next) {
	let search = req.params.search;
	let dbase;
	if(search.toLowerCase() < 'cliff richard'){
	  dbase = db;
	}else if(search.toLowerCase() < 'hank williams'){
	  dbase = db1;
	}else if(search.toLowerCase() < 'leonard cohen'){
	  dbase = db2;
	}else if(search.toLowerCase() < 'peter gabriel'){
	  dbase = db3;
	}else if(search.toLowerCase() < 'tara lyn hart'){
	  dbase = db4;
	}else{
	  console.log(6);
	  dbase = db5;
	}


	let returnData = [];

	db.any(`select * from artists where name ilike '%` + search + `%'`)
		.then(data => {
			returnData = returnData.concat(data);
			db1.any(`select * from artists where name ilike '%` + search + `%'`)
				.then(data => {
					returnData = returnData.concat(data);
					db2.any(`select * from artists where name ilike '%` + search + `%'`)
						.then(data => {
							returnData = returnData.concat(data);
							db3.any(`select * from artists where name ilike '%` + search + `%'`)
								.then(data => {
									returnData = returnData.concat(data);
									db4.any(`select * from artists where name ilike '%` + search + `%'`)
										.then(data => {
											returnData = returnData.concat(data);
											console.log(quickSortBySongNum(returnData));
											db5.any(`select * from artists where name ilike '%` + search + `%'`)
											res.status(200)
												.json({
													status: 'success',
													data: quickSortBySongNum(returnData)
												})
										})
										.catch(err => {
											return next(err);
										})
								})
								.catch(err => {
									return next(err);
								})
						})
						.catch(err => {
							return next(err);
						})
				})
				.catch(err => {
					return next(err);
				})
		})
		.catch(err => {
			return next(err);
		})

}


function getSongsBySearch (req, res, next) {
	let search = req.params.search;
	//Need to search every database
	let returnData = [];
	
	db.any(`select * from songs where title ilike '%` + search + `%'`)
		.then(data => {
			returnData = returnData.concat(data);
			db1.any(`select * from songs where title ilike '%` + search + `%'`)
				.then(data => {
					returnData = returnData.concat(data);
					db2.any(`select * from songs where title ilike '%` + search + `%'`)
						.then(data => {
							returnData = returnData.concat(data);
							db3.any(`select * from songs where title ilike '%` + search + `%'`)
								.then(data => {
									returnData = returnData.concat(data);
									db4.any(`select * from songs where title ilike '%` + search + `%'`)
										.then(data => {
											returnData = returnData.concat(data);
											db5.any(`select * from songs where title ilike '%` + search + `%'`)
											res.status(200)
												.json({
													status: 'success',
													data: returnData
												})
										})
										.catch(err => {
											return next(err);
										})
								})
								.catch(err => {
									return next(err);
								})
						})
						.catch(err => {
							return next(err);
						})
				})
				.catch(err => {
					return next(err);
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
	for(let item of songs){
		let id = item.id;

		if(item.artist.toLowerCase() < 'chuck berry'){
		  dbase = db;
		}else if(item.artist.toLowerCase() < 'h'){
		  dbase = db1;
		}else if(item.artist.toLowerCase() < 'leann rimes'){
		  dbase = db2;
		}else if(item.artist.toLowerCase() < 'patty smyth'){
		  dbase = db3;
		}else if(item.artist.toLowerCase() < 't'){
		  dbase = db4;
		}else{
		  console.log(6);
		  dbase = db5;
		}

		dbase.none(`update songs set title = '` + songs[item].title + `', artist = '` + songs[item].artist + `', notes='` + songs[item].notes + `' where id = '` + songs[item].id+`'`)
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
			})

			
			.catch(err => {
				return next(err);
			})
	}
	delayRemove();
	
}

//Do find artist by song id then remove?  Shit idk
//attach sid to song to make this possible maybe with .
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

function removeArtist (artist, dbase){
	statuses = [];
	dbase.result(`delete from artists where name = '`+artist+`'`)
		.then(result => {
			console.log("Removing artist: " + artist);
			statuses.push({artist: 'artist removed'});
		})
		.catch(err => {
			statuses.push({artist: err});
		})
}

//refactor at some point into the other function
function checkArtistHasSongs(artist, dbase){
	dbase.any(`select * from songs where artist = '` + artist + `'`)
		.then(data => {
			console.log("Checking");
			console.log(data);
			if(data.length < 1){
				removeArtist(artist, dbase);
			}
		})
		.catch(err => {
			return next(err);
		})
}

function checkBlankArtists(dbase){
	dbase.any(`select * from artists`)
		.then(data => {
			console.log(data);
			for(item in data){
				getSongsByArtist4Nums(data[item].name, dbase);
				checkArtistHasSongs(data[item].name, dbase);
			}
		})
		.catch(err => {
			console.log(err);
		})

}

function delayRemove(){
	setInterval(function(){
	let dbarray = [db, db1, db2, db3, db4, db5];
	for(let db of dbarray){
		checkBlankArtists(db)
	}

	}
	, 60 * 1000);
}
//Every half hour, checks for blank artists and erases them.


function quickSortBySongNum(arr) {
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

