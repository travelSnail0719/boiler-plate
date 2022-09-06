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

// mongoose 모듈 가져오기(mongoose는 몽고DB 편하게 쓸 수 있는 tool)
const mongoose = require('mongoose');
// 어플리케이션과 몽고DB연결
mongoose.connect('mongodb+srv://ycbkr0719:qlscks2!!@youtubeclone.fv3gkn5.mongodb.net/?retryWrites=true&w=majority', {
    // 짜잘한 에러들이 뜨지 않게 해주기 위함
    // useNewUrlParser : true
    // , useUnifiedTopology : true
    // , useCreateIndex : true
    // , useFindAndModify : false
// 성공 시
}).then(() => console.log('MongoDB Connected...'))
// 실패 시
  .catch(err => console.log(err));



app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!!`));
