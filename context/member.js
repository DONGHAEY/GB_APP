import React, { useContext } from 'react';
import axios from 'axios'
const link = "http://211.216.92.115:5000"

const AuthContext = React.createContext();

const { signIn } = useContext(AuthContext);


const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const value = {
          id:data.id,
          password:data.pw
        }
        axios.post(`${link}/GB/login`, value).then(res => {
          if(res.data.loginSuccess === true) {
            dispatch({ type: "SIGN_IN" })
          } else {
            dispatch({type:"RESTORE_TOKEN", stat:false})
          }
        })
      },
      register : (data) => {
          console.log("register");
      },
      signOut : () => {
        axios.post(`${link}/GB/logout`).then(res => {
          if(res.data.isLogout === true) {
            dispatch({type:"RESTORE_TOKEN", stat:false})
          } else {
            dispatch({type:"RESTORE_TOKEN", stat:false})
          }
        })
      }
    }),
    []
  );

  export default authContext