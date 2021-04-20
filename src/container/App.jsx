import LoginSignup from "../components/loginSignup";
import Chatapp from "../components/Chatapp";
import "../assets/css/index.css";
import { connect } from "react-redux";
import firebase from "../config/firebase";
import { useEffect, useState } from "react";

function App(props) {
  const [crUser, setCrUser] = useState();

  // const db = firebase.firestore();
  // const functions = firebase.functions();
  // const addAdminRole = functions.httpsCallable("addadminRole");
  // addAdminRole({ email: "sufyan@gmail.com" });
  // db.settings({ timestampsInsnapshot: true });

  useEffect(() => {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      setCrUser(user);
    } else {
      // No user is signed in.
      setCrUser(false);
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setCrUser(user);
      } else {
        setCrUser(false);
      }
    });
  }, []);
  return <>{crUser ? <Chatapp /> : <LoginSignup />}</>;
}

const mapStateToProps = (state) => ({
  currentUser: state.currentuser,
});

export default connect(mapStateToProps, null)(App);
