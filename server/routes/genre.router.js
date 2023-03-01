const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


//Need to use joint table to get with search query

// SELECT "movies"."title", "genres"."name"
// FROM "movies_genres"
// JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
// JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
// WHERE "movies"."id" = $1;

router.get('/details/:id', (req, res) => {
  // Add query to get all genres
  console.log('getting movies with id: ', req.params.id);
  const query = 
  `
  SELECT "genres"."name", "movies"."title", "movies"."poster", "movies"."description"
  FROM "genres"
  JOIN "movies_genres" ON "genres".id = "movies_genres"."genre_id"
  JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
  WHERE "movies"."id" = $1;;
  `;
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500)
    })
});



module.exports = router;