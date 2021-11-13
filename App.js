import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Button,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import * as Permissions from 'expo-permissions';
import axios from "axios";
import { WebView } from "react-native-webview";
import member from "./reducer/member";
import styles from "./Component/style";
import CButton from "./CButton";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();

function HomeScreen() {
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

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
      <Text style={{ fontSize: 10, color: "#D2DABA" }}>
        회원가입 및 비밀번호 찾기
      </Text>
      <Pressable style={styles.button} onPress={() => signIn({ id, pw })}>
        <Text style={styles.text}>{"로그인"}</Text>
      </Pressable>
    </View>
  );
}

function DetailsScreen() {
  const [Name, SetName] = React.useState("");
  const MainPage = () => {
    const { logout } = React.useContext(AuthContext);
    axios.post("http://211.216.92.115:5000/GB/auth").then((res) => {
      if (res.data.isAuth === true) {
        SetName(res.data.client.name);
      } else {
        logout();
      }
    });
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 130,
            height: 130,
            borderRadius: 100,
            marginBottom: 10,
          }}
          source={{
            uri: "https://prodigits.co.uk/thumbs2/mobilium/wallpapers/p2/2012/fcelebs/640x960/9vybozl1.jpg",
          }}
        />
        <Text style={{ marginBottom: 5 }}>{`${Name}님 어서오세요`}</Text>
        <Button
          title="로그아웃"
          onPress={() => {
            logout();
          }}
        ></Button>
      </View>
    );
  };
  const Setting = () => {
    // Permissions.askAsync(Permissions.CAMERA);
    return (
      <WebView
        useWebKit
        allowsInlineMediaPlayback
        source={{ uri: "https://gitplant.netlify.app/" }}
      />
    );
  };

  const Connect = ({ navigation }) => {
    const [name, setName] = React.useState("loading");
    const [humidity, setHumidity] = React.useState(0);
    const [num, setNum] = React.useState(0);
    const [img, setImg] = React.useState(
      "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800"
    );
    let macadress = "";
    let MachineList;
    let history;
    React.useEffect(() => {
      const bootstrapAsync = async () => {
        axios.post(`http://211.216.92.115:5000/GB/MachineList`).then((res) => {
          MachineList = res.data.list;
          macadress = MachineList[num].macadress;
          axios
            .post(`http://211.216.92.115:5000/GB/valueList`, {
              macadress: macadress,
            })
            .then((res) => {
              history = res.data.list;
              setImg(res.data.plantInfo.img_url);
              setName(res.data.plantInfo.name);
              setHumidity(history[history.length - 1].huminity);
              navigation.setOptions({ title: `Machine ${num + 1}` });
            });
        });
      };
      bootstrapAsync();
    }); //repeat code

    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: img,
          }}
        />
        <View style={styles.parent}>
          <CButton
            text={"<"}
            onPress={() => {
              setNum(num + 1);
            }}
          />
          <Text> </Text>
          <CButton text={">"} />
        </View>
        <Text
          style={{ fontSize: 35, fontWeight: "bold", marginTop: 0 }}
        >{`${name}가`}</Text>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          자라고 있어요!!
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
        >{`온도:30°C, 습도:${humidity}%, 광량:30`}</Text>
        <Pressable style={styles.button}>
          <Text style={styles.text}>{"자세히 보기"}</Text>
        </Pressable>
      </View>
    );
  };
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
            <MaterialCommunityIcons
              name="folder-text"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App({ navigation }) {
  let link = "http://211.216.92.115:5000";
  const [state, dispatch] = React.useReducer(member, {
    Auth: false,
  });
  const authcontext = React.useMemo(
    () => ({
      signIn: async (data) => {
        axios
          .post(`${link}/GB/login`, {
            id: data.id,
            password: data.pw,
          })
          .then((res) => {
            if (res.data.loginSuccess === true) {
              dispatch({ type: "SIGN_IN" });
            } else {
              dispatch({ type: "RESTORE_TOKEN", stat: false });
            }
          });
      },
      logout: () => {
        axios.post(`${link}/GB/logout`).then((res) => {
          if (res.data.isLogout === true) {
            dispatch({ type: "RESTORE_TOKEN", stat: false });
          } else {
            dispatch({ type: "RESTORE_TOKEN", stat: false });
          }
        });
      },
    }),
    []
  );

  React.useEffect(() => {
    const bootstrapAsync = () => {
      axios.post(`${link}/GB/auth`).then((res) => {
        if (res.data.isAuth === true) {
          dispatch({ type: "RESTORE_TOKEN", stat: true });
        } else {
          dispatch({ type: "RESTORE_TOKEN", stat: false });
        }
      });
    };
    bootstrapAsync();
  }); //repeat code

  return (
    <AuthContext.Provider value={authcontext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          {state.Auth === false ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          ) : (
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

export default App;
