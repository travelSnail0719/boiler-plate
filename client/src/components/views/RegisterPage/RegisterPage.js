import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions'
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input태그 안에서 직접 변화를 시켜주기 위해서는 state를 활용해서 mutable하게 해야 한다.
  // email을 위한 state와 password를 위한 state를 만들어줘야 한다.
  const [Email, setEmail] = useState("");
                                     // ()안의 인자값은 해당 state의 초기값이 어떻게 되는지를 지정해주면 됨
  const [Name, setName] = useState("");

  const [Password, setPassword] = useState("");

  const [ConfirmPassword, setConfirmPassword] = useState("");


  // onChange 이벤드가 발생 했을 경우 state(Email, Password)를 변경해줌으로써 value를 변경해주는 로직
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) =>{
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    // 페이지가 refresh되어서 하위의 로직들이 실행 되지 않는 문제가 발생 할 수 있는데 이를 방지하기 위함.
    event.preventDefault();

    if (Password != ConfirmPassword){
      return alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요');
    }

    let params = {
      email : Email,
      password : Password,
      name : Name
    }
    // redux를 사용하지 않으면 하단의 dispatch 대신 axios를 사용하여 axios.post('/api/users/register', params) 식으로 백엔드로 데이터를 전송해주면 된다.
    // redux를 사용하고 있기 때문에 dispatch를 통해 action을 날려줄 수 있는 것. redux사용 시 axion는 user_action에서 날려준다.
    dispatch(registerUser(params))
     .then(response => {
        if(response.payload.success){
          navigate('/login');
        } else{
          alert('Falid to sign up');
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

        <label>Name</label>
        <input type={'text'} value={Name} onChange={onNameHandler}/>
        
        <label>Password</label>
        <input type={'password'} value={Password} onChange={onPasswordHandler}/>

        <label>Confirm Password</label>
        <input type={'password'} value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        
        <br />

        <button type="submit">
          회원가입
        </button>

    </form>
  </div>
  )
}

export default Auth(RegisterPage, false);
