// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


// 第三個區塊 自建模組
const database = require('./utils/database');
//引用資料庫
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/404');
const Product = require('./models/product');
const User = require('./models/user');



////////////////////////////////////////////////////////////////

const app = express();


// middleware
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser用來解析POST傳來的資料

app.use(session({ 
	secret: 'sessionToken',  // 加密用的字串
	resave: false,   // 沒變更內容是否強制回存
	saveUninitialized: false ,  // 新 session 未變更內容是否儲存
	cookie: {
		maxAge: 10000 // session 狀態儲存多久？單位為毫秒
	}
})); 

app.use((req, res, next) => {
    res.locals.isLogin = req.session.isLogin || false;
    next();
});

app.use(authRoutes);
app.use(shopRoutes);
app.use(errorRoutes);


database
    .sync({ force: true })
    //重設資料庫，測試資料時就不會
    .then((result) => {
        User.create({ displayName: 'Admin', email: 'admin@skoob.com', password: '11111111'})
        //新增使用者
        Product.bulkCreate(products);
        app.listen(3000, () => {
            console.log('Web Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.log('create web server error: ', err);
    });



const products = [];