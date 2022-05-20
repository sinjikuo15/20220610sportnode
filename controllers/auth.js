const User = require('../models/user');


const getLogin = (req, res) => {
    res.status(200)
        .render('auth/login', {
            path: 'login',
            pageTitle: 'Login'
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
                console.log('login: 找不到此 user 或密碼錯誤');
                return res.redirect('/login');
            }
            if (user.password === password) {
                console.log('login: 成功');
                req.session.isLogin = true;
                //紀錄session
                return res.redirect('/')
            } 
            console.log('login: 找不到此 user 或密碼錯誤');
            res.redirect('/login');
        })
        .catch((err) => {
            req.session.isLogin = false;
            console.log('login error:', err);
        });
};



module.exports = {
    getLogin,
    postLogin,
    postLogout,
}