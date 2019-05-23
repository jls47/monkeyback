var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/songs/r/', db.getMostRecentSongs);
router.get('/api/songs', db.getAllSongs);
router.get('/api/songs/:id', db.getOneSong);
router.post('/api/songs', db.checkSong);
router.get('/api/songs/s/:search', db.getSongsBySearch);
router.get('/api/songs/a/', db.getSongsByArtist);
router.put('/api/songs/', db.editSong);
router.get('/api/artists', db.getAllArtists);
router.get('/api/artists/s/:search', db.getArtistsBySearch);
router.delete('/api/songs/', db.removeSong);


module.exports = router;
