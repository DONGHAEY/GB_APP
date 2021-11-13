import * as React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Button, Alert } from 'react-native';

const styles = require("./style")

const SignIn = () => {
  const [id, setId] = React.useState("")
  const [pw, setPw] = React.useState("")
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GBplant</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChangeText={setId}
        value={id}
      />
            <TextInput
        style={styles.input}
        placeholder="비밀번호"
        onChangeText={setPw}
        value={pw}
        secureTextEntry={true}
      />
      <Text style={{fontSize:10, color:"#D2DABA"}}>회원가입 및 비밀번호 찾기</Text>
      <Pressable style={styles.button} >
      <Text style={styles.text}>{"로그인"}</Text>
    </Pressable>
    </View>
  )
}

export default SignIn