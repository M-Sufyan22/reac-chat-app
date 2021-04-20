import firebase from '../../config/firebase';

const facebooklogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            let create_user = {
                userName: user.displayName,
                userEmail: user.email,
                userUid: user.uid,
                userProfile: user.photoURL
            }
            firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                .then(() => {
                    alert(`${user.displayName}, Welcome to chat`)
                }).catch(function(error) {
                    alert("Some Error Occurred While Logging" + error.message)
                })
        }).catch(function(error) {
            console.log(error.message)
        });
    }
}
const googleLogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                let create_user = {
                    userName: user.displayName,
                    userEmail: user.email,
                    userUid: user.uid,
                    userProfile: user.photoURL
                }
                firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                    .then(() => {
                        alert(`${user.displayName}, Welcome to chat`)
                    }).catch(function(error) {
                        alert("Some Error Occurred While Logging" + error.message)
                    })
                console.log(user)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(email, errorCode, errorMessage)
            });
    }
}
const emailLogin = (email, password, userName, profile, ImgName) => {
    return (dispatch) => {
        // console.log("===>", email, "===>", password, "==>", userName, "===>", profile, "====>", ImgName)

        if (profile !== null && profile !== undefined && profile !== "") {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed up
                    var user = userCredential.user;

                    var uploadTask = firebase.storage().ref('usersProfiles/' + ImgName).put(profile);
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                        user
                            .updateProfile({
                                displayName: userName,
                                photoURL: url,
                            })
                            .then(function() {
                                var Cuser = firebase.auth().currentUser;
                                let create_user = {
                                    userName: Cuser.displayName,
                                    userEmail: Cuser.email,
                                    userUid: Cuser.uid,
                                    userProfile: Cuser.photoURL
                                }
                                console.log("updated successfully!");
                                firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                                    .then(() => {
                                        alert(`${user.displayName}, Welcome to chat`)
                                        check_current_user()
                                    }).catch(function(error) {
                                        alert("Some Error Occurred While Logging" + error.message)
                                    })
                            })
                            .catch(function(error) {
                                // An error happened.
                                console.log(error);
                                alert(error.message)
                            });
                    }).catch((error) => {
                        console.log(error.message)
                    });
                })
                .catch((error) => {

                    var errorMessage = error.message;
                    alert(errorMessage);
                    // ..
                });
        } else {
            alert("please fill the form correctly");
        }
    }
}

const check_current_user = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch({ type: "currentUser", payload: user })
            }
        })
    }
}

const get_All_Users = () => {
    let allUsers;
    return (dispatch) => {
        firebase.database().ref('users').once('value').then((snapshot) => {
            allUsers = Object.values(snapshot.val());
            dispatch({ type: "getAllUsers", payload: allUsers })
        });
    }

}

const get_old_chats = (data) => {
    return (dispatch) => {
        dispatch({ type: "getOldchats", payload: [] })
        let chats = []
        firebase.database().ref('/').child(`chats/${data}`).on('child_added', function(data) {
            chats.push(data.val());
            if (chats !== null) {
                setTimeout(function() {
                    dispatch({ type: "getOldchats", payload: chats })
                }, 500);
            } else {
                dispatch({ type: "getOldchats", payload: [] })
            }
        })
    }
}

const sendMessage = (event, udata, data) => {

    return (dispatch) => {
        event.preventDefault();
        var cUser = firebase.auth().currentUser;

        let chatUSerUid = udata.chatuser.userUid;
        let currentUserUid = cUser.uid;
        let Textmsg = data.chats
        var dt = new Date();
        var h = dt.getHours(),
            m = dt.getMinutes();
        var time;
        if (h === 12) {
            time = h + ":" + m + " PM";
        } else {
            time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;



        let sendMsg = {
                message: {
                    msg: Textmsg,
                    sentTime: time,
                    curtData: today
                },
                senderDetails: {
                    sentBy: cUser.displayName,
                    senderEmail: cUser.email,
                    senderImg: cUser.photoURL,
                },
                sendTo: {
                    receiveBy: udata.chatuser.userName,
                    senderEmail: udata.chatuser.userEmail,
                    senderImg: udata.chatuser.userProfile,
                }
            }
            // console.log(sendMsg.sendTo, "==>", sendMsg.senderDetails, "==>", sendMsg.message)
            // console.log(chatUSerUid)
        const uid_merge = (uid1, uid2) => {
            if (uid1 < uid2) {
                return uid1 + uid2
            } else {
                return uid2 + uid1
            }
        }
        firebase.database().ref('/').child(`chats/${ uid_merge(chatUSerUid, currentUserUid) }`).push(sendMsg)
            .then(() => {
                // alert(`${user.displayName}, Wellcome to chat`)
                console.log('messege sent successfully')
            }).catch(function(error) {
                console.log(error.message)
            })


    }
}

const signOut = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(function() {
            console.log('Signout successfully!')
            dispatch({ type: "logOut" })
        }).catch(function(error) {
            alert("Error Occurred in Log out" + error.message)
        });
    }
}

export { facebooklogin, googleLogin, emailLogin, check_current_user, get_All_Users, get_old_chats, sendMessage, signOut, }