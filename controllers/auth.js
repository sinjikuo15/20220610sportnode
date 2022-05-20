const User = require('../models/user');
const bcryptjs = require('bcryptjs');

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
                req.flash('errorMessage', '錯誤的 Email 或 Password。')
                return res.redirect('/login');
            }
            bcryptjs
                .compare(password, user.password)
                //比對鍵入的password是否跟資料庫雜湊的密碼user.password一樣，並回傳一個布林值
                .then((isMatch) => {
                    if (isMatch) {
                        req.session.user = user;
                        req.session.isLogin = true;
                        //isLogin在app.js定義了，意思是有無登入?是一個布林值
                        return req.session.save((err) => {
                            console.log('postLogin - save session error: ', err);
                            res.redirect('/');
                        });
                    }
                    //不匹配的話
                    req.flash('errorMessage', '錯誤的 Email 或 Password。')
                    res.redirect('/login');
                })
                .catch((err) => {
                    return res.redirect('/login');
                })
        })
        .catch((err) => {
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
                return bcryptjs.hash(password, 12)
                    .then((hashedPassword) => {
                        return User.create({ displayName, email, password: hashedPassword });
                    })
                    .catch((err) => {
                        console.log('create new user error: ', err);
                    })
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