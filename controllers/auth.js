const User = require('../models/user');


const getLogin = (req, res) => {
    const errorMessage = req.flash('errorMessage')[0];
    res.status(200)
        .render('auth/login', {
            //path寫在app.js
            pageTitle: 'Login',
            errorMessage
        });
};

const getSignup = (req, res) => {
    const errorMessage = req.flash('errorMessage')[0];
    res.status(200)
        .render('auth/signup', {
            pageTitle: 'Signup',
            errorMessage
        });
};

//登出時毀滅session
const postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log('session destroy() error: ', err);
        res.redirect('/login');
    });
};


const postLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email }})
        .then((user) => {
            if (!user) {
                req.flash('errorMessage', '錯誤的 Email 或 Password。');
                return res.redirect('/login');
            }
            if (user.password === password) {
                console.log('login: 成功');
                req.session.isLogin = true;
                //紀錄session
                return res.redirect('/')
            } 
            req.flash('errorMessage', '錯誤的 Email 或 Password。');
            res.redirect('/login');
        })
        .catch((err) => {
            req.session.isLogin = false;
            console.log('login error:', err);
        });
};

const postSignup = (req, res) => {
    const { displayName, email, password } = req.body;
    User.findOne({ where: { email } })
        .then((user) => {
            if (user) {
                req.flash('errorMessage', '此帳號已存在！請使用其他 Email。')
                return res.redirect('/signup');
            } else {
                //signup寫入資料庫
                return User.create({ displayName, email, password });
            }
        })
        .then((result) => {
            res.redirect('/login');
        })
        .catch((err) => {
            console.log('signup_error', err);
        });
}




module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup
}