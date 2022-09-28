
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};


// 프록시 서버를 통해서 방화벽, 웹 필터, 캐쉬 데이터, 공유데이터 사용, ip변경 등의 기능을 할 수 있다.
// ex)
// 1. 사내 망에 대한 인터넷 사용 제어
// 2. 캐쉬를 이용한 더 빠른 인터넷 이용 제공
// 3. 더 나은 보안 제공
// 4. 이용 제한된 사이트 접근 가능
