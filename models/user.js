// 1. model과 schema
// 2. model은 schema를 감싸주는 역할
// 3. schema는 각 주체에 대한 세부 상태(정보)를 지정해주는 것
// 4. user모델 만들기

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt를 이용해서 비밀번호를 암호화 시켜주는데 이 때 암호화 10글자로 암호화를 시켜줌
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name :{
        type : String,
        maxlength : 50
    },
    email:{
        type : String,
        // 내용에 대한 공백을 없애줌(ex => ycbkr 0719@naver.com처럼 들어올 떄 ycbkr0719@naver.com으로 공백 제거)
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})
// index에 register 라우터에서 user.save를 실행 하기 전에 해당 함수가 실행되고 함수가 종료되면 다음 로직이 실행됨
userSchema.pre('save', function(next) {
    // userSchema의 스키마들을 말함.
    let user = this;
    // 모델의 password가 변화할 때만 비밀번호 암호화를 진행한다.
    // 해당 조건문이 없으면 비밀번호가 아닌 모든 정보에 대한 저장행위가 일어날 때 마다 비밀번호 암호화가 진행됨
    if(user.isModified('password')){
        // salt를 이용해서 비밀번호 암호화
        // salt를 만들기 위해서는 saltRounds가 필요
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err){
                // 에러가 발생했을 경우 err을 돌려보낸다
                return next(err);
                // 여기서 next는 index.js의 user.save 함수
            }
            // hash의 첫번째 인자로는 클라이언트에서 입력한 실제 비밀번호가 들어온다.
            bcrypt.hash(user.password, salt, function(err, hash){
                                                    // 위의 hash는 암호화된 비밀번호
                if(err){
                    // 에러가 발생했을 경우 next에 에러를 반환하고,
                    return next(err)
                }
                // 클라이언트에서 입력한 비밀번호가 암호화에 성공 했다면
                // 실제 입력한 비밀번호가 들어있던 스키마를 암호화된 비밀번호로 넣어준다.
                user.password = hash;
                next();
            })
        })
    }
});

// model로 schema 감싸주기
const User = mongoose.model('User', userSchema);

// 다른 곳에서도 이 모델을 사용할 수 있게 해주기 위해 exports
module.exports = {User};