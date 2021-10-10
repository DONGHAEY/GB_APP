import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

function HomeScreen() {
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button title="다음화면으로" onPress={()=> {
        signIn()
      }} />
    </View>
  );
}

function DetailsScreen() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="돌아가기" onPress={()=> {
        signOut()
      }}></Button>
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
      signIn: async () => {
        dispatch({ type: "SIGN_IN" });
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
              />
            ): (
            <Stack.Screen
            name="Details"
            component={DetailsScreen}
            />
            )}
        </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
  );
}

export default App;