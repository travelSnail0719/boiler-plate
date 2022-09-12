// 1. npm init을 통해 package.json 생성
// 2. package.json에 main을 index.js로 설정해줘서 backend시작 점이 index.js에서 시작을 하게 된다.
// 3. npm install express --save를 통해 express설치
// 4. --save를 통해 express가 package.json에 표시가 되게 되어짐
// 5. node_modules 안에는 다운받은 라이브러리 들이 모두 들어가게 됨 => 딱히 건들 일은 없음

// express 모듈 가져오기(express를 다운 받았기 떄문에 가져올 수 있음)
const express = require('express');
// 함수 실행을 통해 새로운 express를 만들 수 있음
const app = express();

const port = 3000;
const bodyParser = require('body-parser');
// user모델을 가져온다.
const {User} = require("./models/User");
// 노출되면 안되는 정보가 있을 때 해당 정보를 모듈화 해서 숨겨준다.
const config = require('./config/key');

// 클라이언트에서 오는 정보들을 서버에서 분석해서 가져올 수 있게 해줌
// application/x-www-form-urlencoded 를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended:true}));

// application/json을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

// cookie-parser 모듈 가져오기
const cookieParser = require('cookie-parser');
// cookie-parser를 사용할 수 있게 해줌
app.use(cookieParser());

// mongoose 모듈 가져오기(mongoose는 몽고DB 편하게 쓸 수 있는 tool)
const mongoose = require('mongoose');
// 어플리케이션과 몽고DB연결
mongoose.connect(config.mongoURI, {
    // 짜잘한 에러들이 뜨지 않게 해주기 위함
    // useNewUrlParser : true
    // , useUnifiedTopology : true
    // , useCreateIndex : true
    // , useFindAndModify : false
// 성공 시
}).then(() => console.log('MongoDB Connected...'))
// 실패 시
  .catch(err => console.log(err));



app.get('/', (req, res) => res.send('Hello World!!!!!!!!'));

// 회원가입을 할 때 사용할 router
app.post('/register', (req, res) => {
  
  // 회원가입 할 때 필요한 정보들을 client(PostMan)에서 가져오면
  // 그것들을 DataBase에 넣어준다.
  // req.body안에는 json형태로 {id : "abc", password:"123"}의 형태로 들어올 수 있음(body-parse가 있기 때문에 가능)
    const user = new User(req.body);
    
    // 몽고디비에서 오는 함수(save)
    // DB에 저장이 실패했을 경우 false와 동시에 err메세지를 보여주고
    // 저장이 성공했을 경우 true반환
    // postman을 통해 user안에 있는 스키마 정보에 맞게 데이터를 날려주면 success : true가 뜸
    user.save((err, userInfo) => {
      if(err){
        return res.json({
          success : false, 
          err
        });
      } else{
        return res.status(200).json({
          success : true
        });
      }
    })
});

app.post('/login', (req, res) => {
  // 1. 요청이 들어온 email을 데이터베이스에서 찾기
  User.findOne({email : req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 2. 요청이 들어온 email이 있다면 비밀번호 일치여부 확인.
    // user에서 생성한 function을 사용
    // isMatch에는 true, false가 반환
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({loginSuccess : false, message : '비밀번호가 틀렸습니다.'});
      } else{
         // 3. 비밀번호가 일치한다면 토큰 생성
         // JSONWEBTOKEN라이브러리 사용
         user.generateToken((err, user) => {
            if(err){
              return res.status(400).send(err);
            } 
            // 토큰을 저장한다.(토큰은 여러군데 저장할 수 있음(쿠키, 로컬스토리지 등에 저장 가능), 지금 넘어올 떄는 user에 들어있고, 사용을 하려면 저장을 해서 보관을 해야함)
            // 쿠키에 저장해본다.(express에서 제공되는 cookie-parser)
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess : true, userId : user._id})

            
         });
      }
    })
  })

  

 
})


app.listen(port, () => console.log(`Example app listening on port ${port}!!`));





// 6. npm install body-parser --save를 통해 body-parser 설치(해당 npm을 이용해서 클라이언트에서 보내주는 정보를 서버에서 받을 수 있게 해준다.)