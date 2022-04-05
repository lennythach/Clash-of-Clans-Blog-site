const authController = require('../controllers/authController');
const { Router } = require('express');
const router = Router();


router.get('/register', authController.register_get);

router.post('/register',authController.register_post);

router.get('/login', authController.login_get);

router.post('/login', (req, res)=> {
    console.log(req.body)
})

module.exports = router;