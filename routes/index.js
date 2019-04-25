var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/songs', db.getAllSongs);
router.get('/api/songs/:id', db.getOneSong);
router.post('/api/songs', db.addSong);
router.get('/api/songs/s/:search', db.getSongsBySearch);
router.get('/api/songs/a/:artist', db.getSongsByArtist);
router.put('/api/songs/:id', db.editSong);
router.get('/api/artists', db.getAllArtists);
router.get('/api/artists/s/:search', db.getArtistsBySearch);
router.get('/api/artists/g/:genre', db.getArtistsByGenre);
router.get('/api/songs/g/:genre', db.getSongsByGenre);


module.exports = router;
