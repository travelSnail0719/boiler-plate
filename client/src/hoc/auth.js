import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import { useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null){
    // SpecificComponent = HOC(higher order component)안에 넣어주는 컴포넌트
    // option 
    //      1) null => 아무나 출입이 가능한 페이지
    //      2) true => 로그인 한 유저만 출입이 가능한 페이지
    //      3) false => 로그인한 유저는 출입이 불가능한 페이지 ex) 로그인 화면
    // adminRoute
    //      1) null(기본값) => 사용하지 않음
    //      2) true => 관리자만 출입이 가능한 페이지

    

    function AuthenticationCheck(props){
        // dispatch의 위치가 function 밖에 있으면 Invalid hook call. 에러 발생하게 됨...한참 찾았네
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log('response', response);

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login');
                    }
                // 로그인 한 상태
                } else {
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/');
                    } else {
                        if(option == false){
                            navigate('/');
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
            );
    }

    return AuthenticationCheck;
}