const router = require('express').Router();
const userRoutes = require('./routes/user.route')

router.use(userRoutes)

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ errors: [{msg: "Unauthorized"}]});
    }
    next(err);
  });

router.get('/', (req, res) => {
    req.servermsg = {msg: "Server up and running"}
    res.status(200).json(req.servermsg)
});

//após tentar casar todas as rotas a ultima rota que sobrou é not found
router.get('*', (req, res) => {
    res.status(404).json({ errors: [{msg: "Not found"}]});
});

module.exports = router;