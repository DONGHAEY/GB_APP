import * as React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios"

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();

let Custommer_name = "";

const SignUp = () => {
  const [id, setId] = React.useState("id")
  const [password, setpassword] = React.useState("pplk")
  const [name, setname] = React.useState("abcd")
  const [nickname, setnickname] = React.useState("abcd")
  return (
<View style={styles.container}>
      <Text style={styles.logo}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        onChange={setId}
        value={id}
      />
            <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        onChange={setpassword}
        value={password}
      />
                  <TextInput
        style={styles.input}
        placeholder="이름"
        onChange={setname}
        value={name}
      />
                        <TextInput
        style={styles.input}
        placeholder="닉네임"
        onChange={setnickname}
        value={nickname}
      />

      <Pressable style={styles.button} onPress={() => {
        axios.post("http://211.216.92.115:5000/GB/register", {id, password, name, nickname});
      }}>
      <Text style={styles.text}>{"다음으로"}</Text>
    </Pressable>
    
    </View>
  ) 
}

function HomeScreen() {

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
      <Text style={{fontSize:10, color:"#D2DABA"}} onPress={()=> {
        return (
          <SignUp name="SignUp"/>
        )
      }}>회원가입 및 비밀번호 찾기</Text>
      <Pressable style={styles.button} onPress={()=>signIn({id, pw})}>
      <Text style={styles.text}>{"로그인"}</Text>
    </Pressable>
    </View>
  );
}

function DetailsScreen() {
  const MainPage = () => {
    const { logout } = React.useContext(AuthContext);
    return (
      <View style={styles.container}>
        <Text>{`${Custommer_name}님 어서오세요`}</Text>
        <Button title="로그아웃" onPress={()=> {
          logout();
        }}></Button>
      </View>
    )
  }
  const Setting = ()=> {
    const [mi, setMi] = React.useState("")
    return (
      <View style={styles.container}>
        <Text style={{fontSize:40, fontWeight:"bold", }}>기기를</Text>
        <Text style={{fontSize:40, marginBottom:30, fontWeight:"bold"}}>등록하기</Text>
        <TextInput
        style={styles.input}
        placeholder="기기 토큰"
        onChange={setMi}
        value={mi}
      />
    <Pressable style={styles.button} onPress={()=> {
          alert(`${mi}를 보냈습니다`)
        }}>
      <Text style={styles.text} >{"다음으로"}</Text>
    </Pressable>
  </View>
    )
  }

  const Connect = ({ navigation }) => {

    const [humidity, setHumidity] = React.useState(0)
    const [num, setNum] = React.useState(0)
    let macadress = "";
    let MachineList;
    let history;
    React.useEffect(() => {
      const ppl = () => {
        axios.post(`http://211.216.92.115:5000/GB/MachineList`).then((res) => {
            MachineList = res.data.list;
            macadress = MachineList[num].macadress;
            axios.post(`http://211.216.92.115:5000/GB/valueList`, {macadress : macadress}).then(res => {
            history = res.data.list;
            setHumidity(history[history.length-1].huminity)
            navigation.setOptions({ title: `Machine ${num+1}`})
          })
        });
      };
      ppl();
    }); //repeat code
    
    
    return (
      <View style={styles.container}>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2018/10/urbanbrush-20181022055401589335.png',
        }}
      />
        <Text style={{fontSize:35, fontWeight:"bold"}}>상추가 잘</Text>
        <Text style={{fontSize:35, fontWeight:"bold"}}>자라고 있어요!!</Text>
        <Text style={{fontSize:20, fontWeight:"bold"}}>{`온도:30°C, 습도:${humidity}%, 광량:30`}</Text>
        <Pressable style={styles.button} onPress={() => {
          setNum(num+1);
        }}>
      <Text style={styles.text}>{"자세히 보기"}</Text>
    </Pressable>
      </View>
    )
  }
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={MainPage}
        options={{
          tabBarLabel: "Main",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
              <Tab.Screen
          name={"Machine"}
          component={Connect}
          options={{
            tabBarLabel: "Connect IOT",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="credit-card-wireless"
                color={color}
                size={26}
              />
            ),
          }}
        />
              <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="folder-text" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
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
      signOut: async () => {
        dispatch({type:"SIGN_OUT"});
      },
      register : (data) => {
        const value = {
          id: data.idx,
          password: data.passwordx,
          name: data.namex,
          nickname : data.nicknamex
        }
        axios.post(`${link}/GB/register`, value)
      },
      logout : () => {
        axios.post(`${link}/GB/logout`).then(res => {
          if(res.data.isLogout === true) {
            dispatch({type:"RESTORE_TOKEN", stat:false})
          }
        })
      }
    }),
    []
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      axios.post(`${link}/GB/auth`).then((res) => {
        if (res.data.isAuth === true) {
          Custommer_name = res.data.client.name
          dispatch({ type: "RESTORE_TOKEN", stat: true });
        } else {
          dispatch({ type: "RESTORE_TOKEN", stat: false });
        }
      });
    };
    []
  }); //repeat code


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
            {
              <Stack.Screen
              component={SignUp}
              name="SignUP"
              />
            }
        </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
  );
}


const styles = StyleSheet.create({
  tinyLogo : {
    width: 400,
    height: 400,
    marginTop: -75
  },
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