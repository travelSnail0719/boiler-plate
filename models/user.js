// 1. model과 schema
// 2. model은 schema를 감싸주는 역할
// 3. schema는 각 주체에 대한 세부 상태(정보)를 지정해주는 것
// 4. user모델 만들기

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// salt를 이용해서 비밀번호를 암호화 시켜주는데 이 때 암호화 10글자로 암호화를 시켜줌
const saltRounds = 10;

// jsonWebToken 모듈 가져오기
const jwt = require('jsonwebtoken');

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
    } else{
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 암호화된 DB비밀번호인 this.password와 입력된 비밀번호인 plainPassword가 일치하는지 확인하기 위해선 입력된 비밀번호를 암호화 시켜서 동일 여부 확인 해야 함.
    bcrypt.compare(plainPassword, this.password, (err, isMatch) =>{
        console.info(this.password)
        if(err){
            return cb(err);
        } else{
            return cb(null, isMatch);
        }
    });
}

userSchema.methods.generateToken = function(cb){
    let user = this
    // jsonWebToken을 이용해서 토큰 생성하기
    // user._id는 DB에 들어가 있는 아이디.
    // id와 secretToken을 이용해서 token을 만들었으므로 추후에는 secretToken을 넣으면 id를 가져올 수 있음
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
     
    user.token = token;
    // 실패 시 err에 대한 정보가 index의 generateToken로 넘어가고 성공 시 user에 대한 정보가 index로 넘어간다.
    user.save((err, user) => {
        if(err){
            return cb(err);  
        } else{
            return cb(null, user);
        }
    })
}

userSchema.methods.findByToken = function(token, cb){
    let user = this;
    // 토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decode){
        // 유저 아이디를 이요해서 유저를 찾은 다음 클라이언트에서 가져온 토큰과 DB에 저장되어있는 토큰의 일치여부 확인
        // findOne는 몽고DB에서 지원하는 기능
        user.findOne({"_id" : decode, "token" : token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

// model로 schema 감싸주기
const User = mongoose.model('User', userSchema);

// 다른 곳에서도 이 모델을 사용할 수 있게 해주기 위해 exports
module.exports = {User};