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
  Dimensions,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { WebView } from "react-native-webview";
import member from "./reducer/member";
import styles from "./Component/style";
import CButton from "./CButton";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import ReactNativeItemSelect from "react-native-item-select";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();

const SIGN_UP = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);

  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [nm, setNm] = React.useState("");
  const [nnm, setNnm] = React.useState("");

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
      <TextInput
        style={styles.input}
        placeholder="이름"
        onChangeText={setNm}
        value={nm}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        onChangeText={setNnm}
        value={nnm}
        secureTextEntry={true}
      />
      <Pressable
        style={styles.button}
        onPress={() =>
          signUp(id, pw, nm, nnm, () => {
            navigation.navigate("Home");
            alert("회원가입 성공!!");
          })
        }
      >
        <Text style={styles.text}>{"회원가입"}</Text>
      </Pressable>
    </View>
  );
};

function HomeScreen({ navigation }) {
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
      <Text
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        style={{ fontSize: 10, color: "#D2DABA" }}
      >
        회원가입 및 비밀번호 찾기
      </Text>
      <Pressable style={styles.button} onPress={() => signIn({ id, pw })}>
        <Text style={styles.text}>{"로그인"}</Text>
      </Pressable>
    </View>
  );
}

const MainPage = () => {
  const [Name, SetName] = React.useState("admin");

  const { logout } = React.useContext(AuthContext);

  axios.post(`http://211.216.92.115:5000/GB/auth`).then((res) => {
    if (res.data.isAuth === true) {
      SetName(res.data.client.name);
    }
  });

  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 105,
            height: 105,
            borderRadius: 100,
            marginBottom: 10,
            alignSelf: "flex-start",
          }}
          source={{
            uri: "https://prodigits.co.uk/thumbs2/mobilium/wallpapers/p2/2012/fcelebs/640x960/9vybozl1.jpg",
          }}
        />
        <View style={{ marginLeft: 30 }}>
          <Text
            style={{ marginBottom: 5, fontSize: 20 }}
          >{`${Name}님 어서오세요`}</Text>
          <Button
            title="로그아웃"
            onPress={() => {
              logout();
            }}
          ></Button>
          <Text style={{ marginTop: 10 }}>오늘도 좋은하루 되십시오</Text>
        </View>
      </View>
      <Image
        style={{
          width: 350,
          height: 350,
          borderRadius: 40,
          marginTop: 30,
        }}
        source={{
          uri: "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/at/2021/06/28/20210625001404183_1624604019_1.jpg",
        }}
      ></Image>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        환절기 {Name}님를 위한 식물 추천
      </Text>
      {/* <Text>통신판매업번호 : </Text> */}
    </View>
    // </ScrollView>
  );
};

const SecondAdd = ({ mac, go }) => {
  const textStyle = {
    textAlign: "center",
    color: "#696969",
    fontWeight: "bold",
  };
  const data = [
    {
      firstLetter: "https://i.ibb.co/yBzB8YY/image.png",
      displayName: "상추",
      name: 1,
    },
    {
      firstLetter: "https://i.ibb.co/PjBwXxx/image.png",
      displayName: "치커리",
      name: 2,
    },
    {
      firstLetter: "https://i.ibb.co/G0yv4JX/image.png",
      displayName: "비트",
      name: 3,
    },
    {
      firstLetter: "https://i.ibb.co/zn44VRH/image.png",
      displayName: "당근",
      name: 4,
    },
    {
      firstLetter: "https://i.ibb.co/BVSzrbr/image.png",
      displayName: "배추",
      name: 5,
    },
    {
      firstLetter: "https://i.ibb.co/Sx3r5gN/image.png",
      displayName: "쪽파",
      name: 6,
    },
    {
      firstLetter: "https://i.ibb.co/TgMKr4k/4139319.png",
      displayName: "대파",
      name: 7,
    },
    {
      firstLetter: "https://i.ibb.co/1XtQFF5/5501202.png",
      displayName: "강낭콩",
      name: 8,
    },
    {
      firstLetter: "https://t1.daumcdn.net/cfile/tistory/244A0F475830735605",
      displayName: "고추",
      name: 9,
    },
    {
      firstLetter: "https://ifh.cc/g/sJ0jeb.png",
      displayName: "딸기",
      name: 10,
    },
  ];
  return (
    <ReactNativeItemSelect
      data={data}
      itemComponent={(item) => (
        <View>
          <Image
            style={{ height: 100, width: 100 }}
            source={{ uri: item.firstLetter }}
          ></Image>
          <Text style={textStyle}>{item.displayName}</Text>
        </View>
      )}
      onSubmit={(item) => {
        axios
          .post("http://211.216.92.115:5000/GB/add", {
            macadress: mac,
            plantcode: item.name,
          })
          .then((res) => {
            if (res.data.isAdded === true) {
              go();
              alert("추가가 완료되었습니다");
            }
          });
      }}
    />
    // <WebView
    //   useWebKit
    //   allowsInlineMediaPlayback
    //   source={{ uri: "https://gitplant.netlify.app/choose" }}
    // />
  );
};
const Setting = ({ navigation }) => {
  const [mac, setMac] = React.useState("");
  const [choose, SetChoose] = React.useState(false);
  // Permissions.askAsync(Permissions.CAMERA);
  const go = () => {
    SetChoose(false);
  };
  if (choose == false) {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 400,
            height: 200,
          }}
          source={{
            uri: "https://i.pinimg.com/originals/e1/59/25/e15925c931a81678a3c2e0c0a40db781.gif",
          }}
        ></Image>
        <Text style={{ marginTop: 30 }}>기계를 등록하려 합니다</Text>
        <Text style={{ marginBottom: 30 }}>
          기기에 표시되어있는 MacAdress를 입력해주세요
        </Text>
        <TextInput
          style={styles.input}
          placeholder="MacAdress"
          onChangeText={setMac}
          value={mac}
        />
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              SetChoose(!choose);
              // axios
              //   .post("http://211.216.92.115:5000/GB/Firstadd", {
              //     macadress: mac,
              //   })
              //   .then((res) => {
              //     alert(res.data.passed);
              //     if (res.data.passed === true) {
              //       navigation.navigate("SecondAdd");
              //     }
              //   });
            }}
          >
            {"등록시작"}
          </Text>
        </Pressable>
      </View>
    );
  } else {
    return <SecondAdd mac={mac} go={go} />;
  }
};
let history = [];
let macadress = "";
let MachineList;

const Chart = () => {
  if (history.length > 7) {
    return (
      <View style={styles.container}>
        <Text>최근 {}7분간의 실적입니다</Text>
        <Text style={{ fontSize: 30 }}>{"습도 상태 그래프"}</Text>
        <LineChart
          data={{
            labels: [
              "7분전",
              "6분전",
              "5분전",
              "4분전",
              "3분전",
              "2분전",
              "1분전",
            ],
            datasets: [
              {
                data: [
                  history[history.length - 7].huminity,
                  history[history.length - 6].huminity,
                  history[history.length - 5].huminity,
                  history[history.length - 4].huminity,
                  history[history.length - 3].huminity,
                  history[history.length - 2].huminity,
                  history[history.length - 1].huminity,
                ],
              },
            ],
          }}
          width={400} // from react-native
          height={250}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text>macadress주소 : {macadress}</Text>
        <Text>기계설명 : {}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 400,
            height: 200,
          }}
          source={{
            uri: "https://wannabenews.com/wp-content/uploads/2020/04/Big-GIF-3.gif",
          }}
        ></Image>
        <Text style={{ fontSize: 25, marginTop: 30 }}>분석하기위해서</Text>
        <Text style={{ fontSize: 25 }}>데이터를 조금만 더 모을게요!</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>-GB-</Text>
      </View>
    );
  }
};

const Connect = ({ navigation }) => {
  const [name, setName] = React.useState("loading");
  const [humidity, setHumidity] = React.useState(0);
  const [left, setLeft] = React.useState(false);
  const [right, setRight] = React.useState(false);
  const [num, setNum] = React.useState(0);
  const [img, setImg] = React.useState(
    "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800"
  );

  const ppl = () => {
    history = [];
    axios.post(`http://211.216.92.115:5000/GB/MachineList`).then((res) => {
      if (res.data.list === false) {
        history = [];
        alert("기기가 없습니다 등록해주세요!");
        navigation.navigate("Setting");
      } else {
        MachineList = res.data.list;
        if (num != MachineList.length - 1) {
          setRight(true);
        } else {
          setRight(false);
        }

        if (num != 0) {
          setLeft(true);
        } else {
          setLeft(false);
        }
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
      }
    });
  };

  React.useEffect(() => {
    ppl();
  }, [num]);

  const add1 = async () => {
    setImg(
      "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800"
    );
    setNum((num) => num + 1);
  };

  const minus1 = async () => {
    setImg(
      "https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800"
    );
    setNum((num) => num - 1);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: img,
        }}
      />
      <View style={styles.sort}>
        <View style={{ marginRight: 150 }}>
          {left && (
            <CButton
              text={"<"}
              onPress={() => {
                minus1();
              }}
            />
          )}
        </View>
        <View style={{ marginLeft: 150 }}>
          {right && (
            <CButton
              text={">"}
              onPress={() => {
                add1();
              }}
            />
          )}
        </View>
      </View>
      <Text
        style={{ fontSize: 35, fontWeight: "bold", marginTop: 0 }}
      >{`${name}가`}</Text>
      <Text style={{ fontSize: 35, fontWeight: "bold" }}>자라고 있어요!!</Text>
      <Text
        style={{ fontSize: 20, fontWeight: "bold" }}
      >{`온도:--°C, 습도:${humidity}%, 광량:--`}</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              navigation.navigate("Chart");
            }}
          >
            {"자세히 보기"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            ppl();
            alert("새로고침 성공!!");
          }}
        >
          <Image
            style={{ height: 15, width: 15 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiw58U8l2OpBRU4aMTD8F9iqmHx4I_2t2prA&usqp=CAU",
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const DetailsScreen = () => {
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
};

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
      signUp: (id, pw, nm, nnm, cb) => {
        axios
          .post(`${link}/GB/register`, {
            id: id,
            password: pw,
            name: nm,
            nickname: nnm,
          })
          .then((res) => {
            if (res.data.isRegister === true) {
              cb();
            } else {
              alert("회원가입안됨");
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
          <Stack.Screen name="SignUp" component={SIGN_UP}></Stack.Screen>
          <Stack.Screen name="Chart" component={Chart}></Stack.Screen>
          <Stack.Screen name="SecondAdd" component={SecondAdd}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
