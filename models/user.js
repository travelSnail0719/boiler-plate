// 1. model과 schema
// 2. model은 schema를 감싸주는 역할
// 3. schema는 각 주체에 대한 세부 상태(정보)를 지정해주는 것
// 4. user모델 만들기

const mongoose = require('mongoose');

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
// model로 schema 감싸주기
const User = mongoose.model('User', userSchema);

// 다른 곳에서도 이 모델을 사용할 수 있게 해주기 위해 exports
module.exports = {User};