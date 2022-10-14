import React, { useState } from 'react'
// react플로우에서는 dispatch를 통해 actiond을 취하게 된다.
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LoginPage(props) {
  // dispatch를 통해 Action을 취함(Redux의 state는 Action을 통해서만 변경이 가능하고 action은 dispatch를 통해서 사용 가능)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input태그 안에서 직접 변화를 시켜주기 위해서는 state를 활용해서 mutable하게 해야 한다.
  // email을 위한 state와 password를 위한 state를 만들어줘야 한다.
  const [Email, setEmail] = useState("");
                                     // ()안의 인자값은 해당 state의 초기값이 어떻게 되는지를 지정해주면 됨
  const [Password, setPassword] = useState("");


  // onChange 이벤드가 발생 했을 경우 state(Email, Password)를 변경해줌으로써 value를 변경해주는 로직
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    // 페이지가 refresh되어서 하위의 로직들이 실행 되지 않는 문제가 발생 할 수 있는데 이를 방지하기 위함.
    event.preventDefault();

    console.log('Email', Email);
    console.log('Password', Password);

    let params = {
      email : Email,
      password : Password
    }

    dispatch(loginUser(params))
     .then(response => {
        if(response.payload.loginSuccess){
          navigate('/');
        } else{
          alert('error!!!!');
        }
     })
  }

  return (
    <div style={{
        display :'flex', justifyContent : 'center', alignItems : 'center'
        , width : '100%' , height : '100vh'
    }}>
      
      <form style={{
        display : 'flex', flexDirection : 'column'}}
        onSubmit={onSubmitHandler}
        > 
          <label>Email</label>
          <input type={'email'} value={Email} onChange={onEmailHandler}/>
          <label>Password</label>
          <input type={'password'} value={Password} onChange={onPasswordHandler}/>
          
          <br />

          <button type="submit">
            Login
          </button>

      </form>
    </div>
  )
}

export default Auth(LoginPage, false);

