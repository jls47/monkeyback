const promise = require('bluebird');
const bcrypt = require('bcrypt');

const options = {
	promiseLib: promise
};

const pgp = require('pg-promise')(options);
const cs0 = 'postgres://mwtdzsgrithyrr:59fcae4e073b2083e970d926ede7615fd1eea54d6780bd63afdb40bf1f4c6ad8@ec2-54-167-168-52.compute-1.amazonaws.com:5432/d1ngj9b66pilqp';
const cs1 = 'postgres://rvxyvotsvijvdm:393b223dd10e13ae4f5966466519a452b11e9b0b08b0ea0f3399740e5b847ecc@ec2-54-167-168-52.compute-1.amazonaws.com:5432/d35f0nfbrhmg7u';
const cs2 = 'postgres://wslpibwtvtdwnv:fa448d2b0fde6a2d745a954a02c4a37b2856979882a640e67c35986d9c69b403@ec2-54-167-168-52.compute-1.amazonaws.com:5432/dbokaasteuvdil';
const cs3 = 'postgres://altctcpabtwrrt:59e018d340499f49cc8f0d860cd6cfeaefc7d9aeb33f876b3e498fbb5995402d@ec2-54-167-168-52.compute-1.amazonaws.com:5432/de4bb1ghv634us';
const cs4 = 'postgres://fwxrrcrtdlehji:179ee8c2f87182ff503f62a5c3a8475b961c76927832af804877331332efa760@ec2-54-167-168-52.compute-1.amazonaws.com:5432/d4ed3hf906m78i';
const cs5 = 'postgres://rhrgifojnudpsg:3bb3a85508160ecaee36d994b47b0f08a430c192ff0b600d5ddec43771fba701@ec2-54-167-168-52.compute-1.amazonaws.com:5432/dd7nhhkqsd5ju8';
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
	Promise.all([recents, recents1, recents2, recents3, recents4, recents5])
		.then(data => {
			console.log(data);
			let newArr = data[0].concat(data[1], data[2], data[3], data[4], data[5]);
			let newData = quickSortBySongId(newArr).reverse();
			let shortData = newData.slice(1, 15);
			res.status(200)
				.json({
					status: 'success',
					data: shortData,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return err;
		})
}

const recents = $p((resolve, reject) => {
	db.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const recents1 = $p1((resolve, reject) => {
	db1.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const recents2 = $p2((resolve, reject) => {
	db2.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const recents3 = $p3((resolve, reject) => {
	db3.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const recents4 = $p4((resolve, reject) => {
	db4.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const recents5 = $p5((resolve, reject) => {
	db5.any(`select * from songs order by id desc`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

function getAllSongs(req, res, next){
	Promise.all([all, all1, all2, all3, all4, all5])
		.then(data => {
			let newData = data[0].concat(data[1], data[2], data[3], data[4], data[5])
			res.status(200)
				.json({
					status: 'success',
					data: newData,
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
	if(lowArtist < "chuck berry"){
		dbase = db;
	}else if(lowArtist < "h"){
		dbase = db1;
	}else if(lowArtist < "leann rimes"){
		dbase = db2;
	}else if(lowArtist < "patty smyth"){
		dbase = db3;
	}else if(lowArtist < "t"){
		dbase = db4;
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
	Promise.all([alla, alla1, alla2, alla3, alla4, alla5])
		.then(data => {
			let newData = data[0].concat(data[1], data[2], data[3], data[4], data[5])
			let allData = quickSortBySongNum(newData).reverse();
			res.status(200)
				.json({
					status: 'success',
					data: newData,
					message: 'retrieval successful'
				})
		})
		.catch(err => {
			return next(err);
		})
}

const alla = $p((resolve, reject) => {
	db.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const alla1 = $p1((resolve, reject) => {
	db1.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const alla2 = $p2((resolve, reject) => {
	db2.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const alla3 = $p3((resolve, reject) => {
	db3.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const alla4 = $p4((resolve, reject) => {
	db4.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

const alla5 = $p5((resolve, reject) => {
	db5.any(`select * from artists`)
		.then(data => {
			resolve(data);
		})
		.catch(e => {
			resolve(e);
		})
})

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
													data: quickSortBySongNum(returnData).reverse()
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
//receives nested array

function editSong (req, res, next) {
	let data = req.body;
	console.log(data);
	let dbase;
	let statuses = [];
	for(let songs of data){
		for(let item of songs){
			console.log(item);
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

			dbase.none(`update songs set title = '` + item.title + `', artist = '` + item.artist + `', notes='` + item.notes + `' where id = '` + item.id+`'`)
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
	}
	delayRemove();
	
}

//Do find artist by song id then remove?  Shit idk
//attach sid to song to make this possible maybe with .
function removeSong (req, res, next){
	console.log(req.params.data.id1);
	var statuses = [];
	var pass = 0;
	var id1s = req.params.ids.split(',');
	let dbase;

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
  let pnum = arr[ppoint].numsongs;
  let left = [];
  let right = [];
  let middle = [];
  for(let i = 0; i < arr.length; i++){
    if(arr[i].numsongs > pnum){
      right.push(arr[i]);
    }else if(arr[i].numsongs < pnum){
      left.push(arr[i]);
    }else{
      middle.push(arr[i]);
    }
  }
  
  if(left.length > 1 && right.length > 1){
    return quickSortBySongNum(left).concat(middle.concat(quickSortBySongNum(right)))
  }else if(left.length <= 1 && right.length > 1){
    return left.concat(middle.concat(quickSortBySongNum(right)))
  }else if(left.length > 1 && right.length <= 1){
    return quickSortBySongNum(left).concat(middle.concat(right))
  }else{
    return left.concat(middle.concat(right))
  }
}

function quickSortBySongId(arr){
  let ppoint = Math.floor(Math.random() * arr.length);
  let pnum = arr[ppoint].id;
  let left = [];
  let right = [];
  let middle = [];
  for(let i = 0; i < arr.length; i++){
    if(arr[i].id > pnum){
      right.push(arr[i]);
    }else if(arr[i].id < pnum){
      left.push(arr[i]);
    }else{
      middle.push(arr[i]);
    }
  }
  
  if(left.length > 1 && right.length > 1){
    return quickSortBySongId(left).concat(middle.concat(quickSortBySongId(right)))
  }else if(left.length <= 1 && right.length > 1){
    return left.concat(middle.concat(quickSortBySongId(right)))
  }else if(left.length > 1 && right.length <= 1){
    return quickSortBySongId(left).concat(middle.concat(right))
  }else{
    return left.concat(middle.concat(right))
  }
}

