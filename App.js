import * as React from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

function HomeScreen() {
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Pressable style={styles.button} onPress={()=>signIn()}>
      <Text style={styles.text}>{"Login"}</Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height:30,
    width:120,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;