import express from 'express'
import passport from 'passport'
import User from '../models/User'

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});


router.get('/register', (req, res) => {
    res.render('register', { title: 'Register'});
});

router.post('/register', (req, res) => {
    User.register(new User({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
            return res.render('register', { info : "Sorry, that username is already taken."});
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/ping', (req, res) => {
    res.send("pong!", 200);
});

export default router;
