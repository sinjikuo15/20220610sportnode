const express = require('express');

////////////////////////////////////////////////////////////
//把原本貼在app.js的app.get, post貼過來，並且把app改成router

const router = express.Router();

router.get('/login', (req, res) => {
    res.status(200)
        .render('login', {
            path: '/login',
            pageTitle: 'Login'
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        res.redirect('/');
    } else {
        console.log('欄位尚未填寫完成！')
    }
});

router.post('/logout', (req, res) => {
    // TODO: 實作 logout 機制
    res.redirect('/login')
});

//輸出router
module.exports = router;