import * as React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios"

const Stack = createStackNavigator();

const AuthContext = React.createContext();

function HomeScreen({navigation}) {

  const [id, setId] = React.useState("")
  const [pw, setPw] = React.useState("")

  const { signIn } = React.useContext(AuthContext);

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
      <Text style={{fontSize:10, color:"#D2DABA"}} onPress={()=> alert("hello")}>회원가입 및 비밀번호 찾기</Text>
      <Pressable style={styles.button} onPress={()=>signIn({id, pw})}>
      <Text style={styles.text}>{"로그인"}</Text>
    </Pressable>
    </View>
  );
}

function DetailsScreen() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
    <Pressable style={styles.button} onPress={()=>signOut()}>
      <Text style={styles.text}>{"Log Out"}</Text>
    </Pressable>
    </View>
  );
}


function App({ navigation }) {

  let link = "http://211.216.92.115:5000"


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            Auth: action.stat,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            Auth: true,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            Auth: false,
          };
      }
    },
    {
      Auth: false,
    }
  )


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const value = {
          id:data.id,
          pw:data.pw
        }
        axios.post("http://211.216.92.115:5000/test", value).then(res => {
          if(res.data.isLogin === true) {
            dispatch({ type: "SIGN_IN" })
          } else {
            dispatch({type:"RESTORE_TOKEN", stat:false})
          }
        })
      },
      signOut: async () => {
        dispatch({type:"SIGN_OUT"});
      }
    }),
    []
  );


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          {
            state.Auth === false ? (
              <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
              />
            ): (
            <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ headerShown: false }}
            />
            )}
        </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
  );
}


const styles = StyleSheet.create({
  logo: {
    fontSize:60,
    color:"#8BCF7A",
    fontWeight:"bold",
    marginBottom:30,
    marginTop:-35
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop:25,
    alignItems: 'center',
    justifyContent: 'center',
    height:30,
    width:120,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#91CF81',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor:"#ECECEC",
    marginBottom:10,
    padding: 10,
    borderRadius: 20,
  },
});

export default App;