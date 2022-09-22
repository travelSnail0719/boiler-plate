// process.env.NODE_ENV는 환경변수로 local환경일 떄는 반환이 development로 되고 배포한 후에는 production으로 반환된다.
if(process.env.NODE_ENV === 'production'){
    // 배포가 된 후에는 prod.js에서 모듈을 가져오고
    module.exports = require('./prod');
} else {
    // 로컬일 떄는 dev.js에서 가져온다
    module.exports = require('./dev');
}