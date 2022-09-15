// 인증 처리를 위한 middleWare
const {User} = require("../models/User");

let auth = (req, res, next) =>{
    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookie.x_auth;

    // 2. 클라이언트에서 가져온 토큰을 복호화 한 후 DB에 있는 유저를 찾는다.(User모델에서 함수 생성해서 한다.)
    User.findByToken(token, (err, user)=>{
        // 에러 발생
        if(err) throw err;
        // 유저가 DB에 존재하지 않을 경우
        if(!user) return res.json({isAuth : false, error : true});
        // 유저가 존재할 경우
        // req에 유저정보와 토큰을 넣어주는 이유는 Router에서 쉽게 사용하기 위해서
        req.token = token;
        req.user = user;
        // next를 해주는 이유는 현재 실행되는 부분이 Router의 middleWare이기 때문에
        // next가 없으면 middleWare에 같혀버림
        next();
    });

    // 3. DB에 해당하는 유저가 있으면 인증 성공, 해당하는 유저가 없으면 실패 처리
}

module.exports = {auth};