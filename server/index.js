const router = require('express').Router();

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ errors: [{msg: "Unauthorized"}]});
    }
    next(err);
  });

router.get('/', (req, res) => {
    res.status(200).json({msg: "Server up and running"})
});
  //após tentar casar todas as rotas a ultima rota que sobrou é not found
router.get('*', (req, res) => {
    res.status(404).json({ errors: [{msg: "Not found"}]});
});

module.exports = router;