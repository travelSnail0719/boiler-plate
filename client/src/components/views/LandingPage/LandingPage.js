import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
  // useEffect는 LandingPage에 들어오자마자 실행시긴다는 뜻
  useEffect(() =>{
    axios.get('/api/hello')
    .then(response => {console.log(response)})
  }, [])
  
  
  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage



// 서버의 포트는 3000이고 클라이언트의 포트는 3001이라서 아무런 설정 없이 axios를 날리게 되면 cors(Cross origin Resource Sharing) 정책에 의해 막히게 됨
// 이러한 문제를 해결하기 위해서 Proxy를 사용하는 방법으로 해결 할 수 있다.
// proxy를 사용하기 위해서는 npm install http-proxy-middleware --save를 통해 npm다운