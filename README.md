# boiler-plate
# 사용 NPM
# body-parser npm install body-parser --save  클라이언트에서 오는 정보들을 서버에서 분석해서 가져올 수 있게 해줌
# express npm install express --save          java의 스프링 같은 FrameWork
# mongoose npm install mongoose --save        MongoDB를 편하게 사용할 수 있는 Tool
# nodemone npm istall nodemon --save-dev      스크립트의 코드 변화가 있을 때 nodemon을 통해 실행을 했을 떄는 서버를 재기동 하지 않아도 반영할 수 있게 해줌 -dev는 로컬에서 할 떄랑 배포 이후에 할 떄의 모드가 있는데 -dev는 로컬에서 할 떄만 사용가능하게 하는 역할 package.json에 devDependencies에 추가 됨
# bcrypt npm install bcrypt --save            클라이언트 단에서 비밀번호 입력후 DB에 저장 될 때 암호화 시켜줌
# jsonwebtoken npm install jsonwebtoken --save  로그인 성공 시 토큰 만들어주는 라이브러리
# cookie-parser npm install cookie-parser --save 토큰을 쿠키에 저장하기 위해 사용

# Client
# react npx create-react-app . .의 의미는 client 디렉토리 안에 react를 설치하겠다 라는 의미
# webpack는 src폴더의 파일들만 관리를 하고 public부분은 관리를 하주지 않는다. => 이미지 파일등을 넣고 싶을 때는 src부분에 넣어줘야 webpack이 모아주거나 하는 역할을 할 수 있으므로 src 폴더에 넣어주는 것이 좋음
# react-router-dom npm install react-router-dom
# axios npm install axios --save 서버와의 비동기 통신을 위한 npm(AJAX와 같은 역할)
# proxy npm install http-proxy-middleware --save 각기 다른 origin의 소통을 하기 위함(Cros 정책)
# antd npm install --save antd CSS를 도와주는 npm
# redux npm install redux --save
# react-redux npm install react-redux --save
# redux-promise npm install redux-promise --save redux의 middleware로 redux를 잘 사용할 수 있게 도와주는 역할, redux의 state를 변경하기 위해서는 action을 통해 state를 변경해야 하는데 Action은 object형식의 데이터를 받고 그 외의 형식은 받지를 못하는데 promise, function형식으로 올 때 받아줄수 있게 해주는 middleware(promise)
# redux-thunk npm install redux-thunk --save redux의 middleware로 redux를 잘 사용할 수 있게 도와주는 역할, redux의 state를 변경하기 위해서는 action을 통해 state를 변경해야 하는데 Action은 object형식의 데이터를 받고 그 외의 형식은 받지를 못하는데, function형식으로 올 때 받아줄수 있게 해주는 middleware(function)

# concurrnetly npm install concurrently --save 서버를 기동 할 때 front서버 back서버 따로따로 기동하지 않고 한번에 기동할 수 있게 해주는 npm(root 디렉토리의 package.json에서 script->dev 사용법)