var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
//`https://monkey-back.herokuapp.com/api/artists/l/`+letter
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/songs/r/', db.getMostRecentSongs);
router.get('/api/songs', db.getAllSongs);
router.get('/api/songs/l/:letter', db.getSongsByLetter);
router.get('/api/songs/:id', db.getOneSong);
router.post('/api/songs/', db.checkSong);
router.get('/api/songs/s/:search', db.getSongsBySearch);
router.get('/api/songs/a/:artist', db.getSongsByArtist);
router.put('/api/songs/', db.editSong);
router.get('/api/artists', db.getAllArtists);
router.get('/api/artists/s/:search', db.getArtistsBySearch);
router.get('/api/artists/l/:letter', db.getArtistsByLetter);
router.delete('/api/songs/:ids', db.removeSong);
router.post('/api/user', db.createUser);
router.get('/api/user', db.login);


module.exports = router;
