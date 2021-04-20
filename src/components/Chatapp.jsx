import Logo from "../assets/images/logo.svg";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  facebooklogin,
  check_current_user,
  get_All_Users,
  get_old_chats,
  sendMessage,
  signOut,
} from "../store/action";
import { Sling as Hamburger } from "hamburger-react";
import userimg from "../../src/assets/images/fahad.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

//
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import firebase from "../config/firebase";
import unkownUser from "../assets/images/unkownUser.png";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Chatapp(props) {
  const [chatUser, setchatUser] = useState({});
  const [chats, setChats] = useState({});
  const [isOpen, setOpen] = useState(true);
  const [isAbout, setAbout] = useState(false);
  const [settings, setSettings] = useState(false);
  const [editSec, seteditSec] = useState(false);
  const [faq, setfaq] = useState(false);

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  useEffect(() => {
    props.check_current_user();
    props.get_All_Users();

    var tablinks = document.getElementsByClassName("tablinks");
    tablinks[1].classList.add("nav-item-active");
  }, []);

  const uid_merge = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };
  // props.signOut()
  const getRecentChats = (s) => {
    let curtUid = props.currentUser.uid;
    let chatUid = s.userUid;
    props.get_old_chats(uid_merge(curtUid, chatUid));
  };

  const chatWithOtherUser = (s) => {
    setchatUser({ chatuser: s });
    getRecentChats(s);
  };

  const chatMsg = (e) => {
    setChats({ chats: e.target.value });
  };

  const showAbout = () => {
    if (isAbout === true) {
      setAbout(false);
    } else {
      setAbout(true);
    }
  };
  const openSettings = () => {
    if (settings === true) {
      setSettings(false);
    } else {
      setSettings(true);
    }
  };

  const openSideTabs = (evt, cityName) => {
    var i, tabcontent, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    tabcontent = document.getElementsByClassName("tabcontent");
    if (tablinks[1].classList.contains("nav-item-active")) {
      tablinks[1].classList.remove("nav-item-active");
    }
    setAbout(false);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    document.getElementById(cityName).style.display = "flex";

    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].onclick = function () {
        for (let j = 0; j < tablinks.length; j++) {
          if (tablinks[j].classList.contains("nav-item-active")) {
            tablinks[j].classList.remove("nav-item-active");
          }
        }
        setTimeout(() => {
          tablinks[i].classList.add("nav-item-active");
        }, 200);
      };
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log("logout....");
  };

  const IOSSwitch = (themes) => {
    return <Switch />;
  };
  const showEdit = () => {
    if (editSec === true) {
      seteditSec(false);
    } else {
      seteditSec(true);
    }
    if (faq === true) {
      setfaq(false);
    }
  };
  const showFaq = () => {
    if (faq === true) {
      setfaq(false);
    } else {
      setfaq(true);
    }
    if (editSec === true) {
      seteditSec(false);
    }
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("successfully signout");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const chatScreen = useRef();
  const btm = useRef();

  const bringDownToChats = (params) => {
    if (params === 1) {
      chatScreen.current.scrollTop =
        chatScreen.current.clientHeight + chatScreen.current.scrollHeight;
    } else {
      setTimeout(() => {
        if (chatScreen.current !== undefined && chatScreen.current !== null) {
          chatScreen.current.scrollTop =
            chatScreen.current.clientHeight + chatScreen.current.scrollHeight;
        }
      }, 800);
    }
  };
  const showGoToBottom = () => {
    const height = chatScreen.current.scrollHeight;
    const top = chatScreen.current.scrollTop;
    const client = chatScreen.current.clientHeight;

    // console.log(height - top, "===", client);
    if (height - top > client + 150) {
      btm.current.classList.add("show-btm");
    } else {
      btm.current.classList.remove("show-btm");
    }
  };

  const getLastMsg = async (e, chatUSerUid, currentUserUid) => {
    // let chats = [];
    // console.log("hi");
    // firebase
    //   .database()
    //   .ref("/")
    //   .child(`chats/${uid_merge(currentUserUid, chatUSerUid)}`)
    //   .on("child_added", function (data) {
    //     chats.push(data.val());
    //     if (chats !== undefined || chats !== null || chats !== []) {
    //       //   // console.log(data.val().slice(-1).pop().message.msg);
    //       // console.log(chats);
    //       const lastItem = chats[chats.length - 1].message.msg;
    //       console.log(lastItem);
    //       console.log((e.target.innerHTML = lastItem));
    //       return lastItem;
    //     }
    //   });

    console.log(e);
  };

  const changeUSerData = () => {
    // console.log(props.currentUser);
    var user = firebase.auth().currentUser;
    console.log(user);
    // user
    //   .updateProfile({
    //     displayName: "Jane Q. User",
    //     photoURL: "https://cutt.ly/1x6kpEq",
    //   })
    //   .then(function () {
    //     // Update successful.
    //     console.log("updated successfully!");
    //   })
    //   .catch(function (error) {
    //     // An error happened.
    //     console.log(error);
    //   });

    // $('.chat-header .menu .menu-ico').click(function(){
    // 	$('.chat-header .menu ul.list').slideToggle('fast');
    // });
    // $(document).click(function(){
    // 	$(".chat-header .menu ul.list").slideUp('fast');
    // });
    // $(".chat-header .menu ul.list,.chat-header .menu .menu-ico").click(function(e){
    // 	e.stopPropagation();
    // });

    // $(".chat-header .menu ul.list,.chat-inp .emoji").click(function (e) {
    //   e.stopPropagation();
    // });
    // $(".emoji-dashboard li .em").click(function () {
    //   var emo = $(this).css("background-image").split('"')[1];
    //   $(".chat-inp .input").find("div").remove();
    //   $(".chat-inp .input").append('<img src="' + emo + '">');
    //   $(".emoji-dashboard").slideUp("fast");
    // });
    // $(".chat-inp .opts .send").click(function () {
    //   var val = $(".chat-inp .input").html();
    //   if (val.length > 0) {
    //     $(".chat-body .chats-text-cont").append(
    //       '<p className="chat-text"><span>' + val + "</span></p>"
    //     );
    //   }
    //   $(".chat-inp .input").html("");
    //   $(".chats-text-cont div").remove();
    // });
    // $("input,.input").each(function () {
    //   tmpval = $(this).text().length;
    //   if (tmpval != "") {
    //     $(this).prev().addClass("trans");
    //     $(this).parent().addClass("lined");
    //   }
    // });
    // $("input,.input")
    //   .focus(function () {
    //     $(this).prev().addClass("trans");
    //     $(this).parent().addClass("lined");
    //     $(document).keypress(function (e) {
    //       if (e.which == 13) {
    //         $(".chat-inp .opts .send").click();
    //       }
    //     });
    //   })
    //   .blur(function () {
    //     if ($(this).text().length == "") {
    //       $(this).prev().removeClass("trans");
    //       $(this).parent().removeClass("lined");
    //     }
    //   });
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="side-menu-btn">
          <div className="navbar-icon-open">
            <Hamburger
              label="Show menu"
              rounded
              easing="cubic-bezier(.91,.76,.14,.8)"
              duration={0.7}
              distance="sm"
              size={25}
              color="#fff"
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>
        </div>
        <div
          className="side-menu"
          style={isOpen ? { marginLeft: "0" } : { marginLeft: "-60px" }}
        >
          <div className="navs">
            <ul role="tablist" className="side-menu-nav">
              <li
                id="profile"
                className="nav-item tablinks"
                title="About"
                onClick={(e) => openSideTabs(e, "AboutUser")}
              >
                <a className="nav-link">
                  <i className="fa fa-user"></i>
                </a>
              </li>
              <li
                id="Chats"
                className="nav-item tablinks"
                title="Messages"
                onClick={(e) => openSideTabs(e, "ChatWithOthers")}
              >
                <a className="nav-link">
                  <i className="fa fa-commenting"></i>
                </a>
              </li>

              <li
                id="Groups"
                className="nav-item tablinks "
                title="Settings"
                onClick={(e) => openSideTabs(e, "settings")}
              >
                <a className="nav-link">
                  <i className="fa fa-gear"></i>
                </a>
              </li>
            </ul>
            <ul role="tablist" className="side-menu-nav">
              <a className="nav-link lightDarkSwitch">
                <Switch
                  checked={state.checkedB}
                  onChange={signOut}
                  color="#9aa1b9"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </a>
              <li id="Groups">
                <a className="nav-link">
                  {props.currentUser.photoURL ? (
                    <>
                      <img
                        src={props.currentUser.photoURL}
                        alt={props.currentUser.displayName}
                        title="user Profile Image"
                        className="profile-user"
                      />
                    </>
                  ) : (
                    <img
                      src={unkownUser}
                      alt="unkown user"
                      title="user Profile Image"
                      className="profile-user"
                    />
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="chat-left-side">
          {/* Recently Chats With others section start*/}
          <div id="ChatWithOthers" className="tabcontent">
            <div className="chat-wi-othr-top-sec">
              <div className="sm-row">
                <h4>Chats</h4>
              </div>
              <div className="sm-row-c" style={{ flexDirection: "column" }}>
                <div className="search-bar">
                  <span className="searchIcon text-muted">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="search messages or users"
                  />
                </div>
              </div>
              <div className="sm-row-c">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  navigation
                >
                  {props.allusers.map((otherUsers, i) =>
                    otherUsers.userUid !== props.currentUser.uid ? (
                      <SwiperSlide key={i}>
                        <div
                          className="profile-mini-card"
                          onClick={() => {
                            chatWithOtherUser(otherUsers);
                            bringDownToChats();
                          }}
                        >
                          <div className="mini-card-wrapper">
                            <span className="mini-card-user-img">
                              {otherUsers.userProfile ? (
                                <>
                                  <img
                                    src={otherUsers.userProfile}
                                    alt={otherUsers.userName}
                                  />
                                </>
                              ) : (
                                <img src={unkownUser} alt="unkown user" />
                              )}
                            </span>
                            <p className="mini-card-username">
                              {otherUsers.userName
                                ? otherUsers.userName
                                : "Unkown user"}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ) : null
                  )}
                </Swiper>
              </div>
            </div>

            <div className="chat-wi-othr-btm-sec">
              <div className="sm-row">
                <h3>Recent</h3>
              </div>
              <div className="sm-row-c">
                <ul className="recent-msg-wrapper">
                  {/* {console.log(props.allusers)}
                {props.allusers.map((otherUsers, i) => {
                  return <li key={i}>hi</li>;
                })} */}
                  {props.allusers.map((otherUsers, i) =>
                    otherUsers.userUid !== props.currentUser.uid ? (
                      <li
                        key={i}
                        onClick={() => {
                          chatWithOtherUser(otherUsers);
                          bringDownToChats();
                        }}
                      >
                        <div className="recent-u-img">
                          {otherUsers.userProfile ? (
                            <>
                              <img
                                src={otherUsers.userProfile}
                                alt={otherUsers.userName}
                              />
                            </>
                          ) : (
                            <img src={unkownUser} alt="unkown user" />
                          )}
                        </div>
                        <div className="recent-u-msg">
                          <h6 className="text-muted">
                            {" "}
                            {otherUsers.userName
                              ? otherUsers.userName
                              : "Unkown user"}
                          </h6>
                          <p
                            className="text-muted"
                            // onLoad={(e) =>
                            //   getLastMsg(
                            //     e,
                            //     otherUsers.userUid,
                            //     props.currentUser.uid
                            //   )
                            // }
                          >
                            Hello... How are you?
                            {/* {console.log(
                            // otherUsers.userUid,
                            // props.currentUser.uid,
                            // uid_merge(otherUsers.userUid, props.currentUser.uid)
                            getLastMsg(
                              otherUsers.userUid,
                              props.currentUser.uid
                            )
                            )} */}
                          </p>
                          <span className="lst-msg-rec-time text-muted">
                            2:56 Pm
                          </span>
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Recently Chats With others section End*/}

          {/* USer About Section Start */}
          <div id="AboutUser" className="tabcontent">
            <div className="sm-row opnSet">
              <h4>My Profile</h4>
              <i
                className="fa fa-ellipsis-v "
                aria-hidden="true"
                onClick={openSettings}
              ></i>
              <div
                className="drop-down-settings"
                style={
                  settings
                    ? { top: "45px", visibility: "visible" }
                    : { top: "80px", visibility: "hidden" }
                }
              >
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Edit
                </button>
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Help
                </button>
                <div tabindex="-1" className="dropdown-divider"></div>
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Setting
                </button>
              </div>
            </div>
            <div className="sm-row-c" style={{ flexDirection: "column" }}>
              {props.currentUser.photoURL ? (
                <>
                  <img
                    src={props.currentUser.photoURL}
                    alt={props.currentUser.displayName}
                    className="main-profile-img"
                    style={{ fontSize: "12px" }}
                  />
                </>
              ) : (
                <img
                  src={unkownUser}
                  alt="unkown user"
                  className="main-profile-img"
                />
              )}

              <h5 className="u-name">
                {props.currentUser.displayName
                  ? props.currentUser.displayName
                  : "No Name"}
              </h5>
              <p className="text-muted" style={{ position: "relative" }}>
                <span className="activeIcon"></span>Active
              </p>
            </div>
            <div className="detail-box">
              <div className="detail-box-top" onClick={showAbout}>
                <h5>
                  <i className="fa fa-user text-muted" aria-hidden="true"></i>{" "}
                  About
                </h5>
                {isAbout ? (
                  <i
                    className="fa fa-caret-up text-muted"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i
                    className="fa fa-caret-down text-muted"
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <div
                className="detail-box-bottom"
                style={isAbout ? { height: "220px" } : { height: "0px" }}
              >
                <div>
                  <div className="card-body">
                    <div>
                      <p className="text-muted">Name</p>
                      <h5>
                        {props.currentUser.displayName
                          ? props.currentUser.displayName
                          : "No Name"}
                      </h5>
                    </div>
                    <div className="mt-4">
                      <p className="text-muted">Email</p>
                      <h5>{props.currentUser.email}</h5>
                    </div>
                    <div className="mt-4">
                      <p className="text-muted">Since</p>
                      <h5>{props.currentUser.metadata.creationTime}</h5>
                    </div>
                    {/* <div className="mt-4">
                      <p className="text-muted">Location</p>
                      <h5>California, USA{console.log(props.currentUser)}</h5>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* USer About Section End */}

          {/* Users Settings Area */}
          <div id="settings" className="tabcontent">
            <div className="sm-row opnSet">
              <h4>Settings</h4>
            </div>
            <div className="sm-row-c" style={{ flexDirection: "column" }}>
              <img src={userimg} alt="fa" className="main-profile-img" />
              <h5 className="u-name">John</h5>
              <p className="text-muted" style={{ position: "relative" }}>
                <span className="activeIcon"></span>Active
              </p>
            </div>
            <div className="detail-box">
              <div className="detail-box-top" onClick={showEdit}>
                <h5>
                  <i className="fa fa-pencil text-muted" aria-hidden="true"></i>{" "}
                  Edit
                </h5>
                {isAbout ? (
                  <i
                    className="fa fa-caret-up text-muted"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i
                    className="fa fa-caret-down text-muted"
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <div
                className="detail-box-bottom"
                style={editSec ? { height: "220px" } : { height: "0px" }}
              >
                <div>
                  <div className="card-body">
                    <button
                      className="Edit-btn btn  btn-light"
                      onClick={changeUSerData}
                    >
                      <i
                        className="fa fa-pencil-square-o text-muted"
                        aria-hidden="true"
                      ></i>
                      Edit
                    </button>
                    <div>
                      <p className="text-muted">Name</p>
                      <h5>
                        {" "}
                        {props.currentUser.displayName
                          ? props.currentUser.displayName
                          : "No Name"}
                      </h5>
                    </div>
                    <div className="mt-4">
                      <p className="text-muted">Email</p>
                      <h5>{props.currentUser.email}</h5>
                    </div>
                    <div className="mt-4">
                      <p className="text-muted">Since</p>
                      <h5>{props.currentUser.metadata.creationTime}</h5>
                    </div>
                    {/* <div className="mt-4">
                      <p className="text-muted">Location</p>
                      <h5>California, USA</h5>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-box-top" onClick={showFaq}>
                <h5>
                  <i
                    className="fa fa-question-circle text-muted"
                    aria-hidden="true"
                  ></i>{" "}
                  Help
                </h5>
                {isAbout ? (
                  <i
                    className="fa fa-caret-up text-muted"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i
                    className="fa fa-caret-down text-muted"
                    aria-hidden="true"
                  ></i>
                )}
              </div>
              <div
                className="detail-box-bottom"
                style={faq ? { height: "180px" } : { height: "0px" }}
              >
                <div>
                  <div className="card-body">
                    <div>
                      <h5>FAQS</h5>
                    </div>
                    <div tabindex="-1" className="dropdown-divider"></div>
                    <div className="mt-4">
                      <h5>Contact</h5>
                    </div>
                    <div tabindex="-1" className="dropdown-divider"></div>
                    <div className="mt-4">
                      <h5>Privacy & Policy</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Users Settings Area End*/}
        </div>

        <div className="chat-screen">
          {Object.keys(chatUser).length ? (
            <>
              <div className="chat-screen-top">
                <div className="other-user-meta">
                  {chatUser.chatuser.userProfile ? (
                    <>
                      <img
                        src={chatUser.chatuser.userProfile}
                        alt={chatUser.chatuser.userName}
                      />
                    </>
                  ) : (
                    <img src={unkownUser} alt="unkown user" />
                  )}

                  <h3>
                    {chatUser.chatuser.userName
                      ? chatUser.chatuser.userName
                      : chatUser.chatuser.userEmail}
                  </h3>
                </div>
                <div>
                  <button className="delAll-btn">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="chat-board">
                <div
                  className="btm"
                  ref={btm}
                  onClick={() => bringDownToChats(1)}
                >
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>
                <ul ref={chatScreen} onScroll={showGoToBottom}>
                  {props.oldChats[0] ? (
                    props.oldChats.map((v, i) =>
                      v.senderDetails.senderEmail !==
                      props.currentUser.email ? (
                        <>
                          <li className="other" key={i}>
                            {v.message.msg}
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="me" key={i}>
                            {v.message.msg}
                          </li>
                        </>
                      )
                    )
                  ) : (
                    <>
                      <h3>Type a message and </h3>
                      <br />
                      <h2>
                        Start conversation with
                        <span> " {chatUser.chatuser.userName} "</span>
                      </h2>
                    </>
                  )}
                </ul>
                <div className="send-chat-area">
                  <form
                    onSubmit={(e) => {
                      props.sendMessage(e, chatUser, chats);
                    }}
                  >
                    <div className="send-msg-field">
                      <div className="sel-emoji">
                        <i className="fa fa-smile-o" aria-hidden="true"></i>
                        <div className="emoji-dashboard">
                          <ul className="emojis">
                            <li className="emoji" data-clipboard-text="--1">
                              <i className="em em---1"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="-1">
                              <i className="em em--1"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="100">
                              <i className="em em-100"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="1234">
                              <i className="em em-1234"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="8ball">
                              <i className="em em-8ball"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="a">
                              <i className="em em-a"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="ab">
                              <i className="em em-ab"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="abc">
                              <i className="em em-abc"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="abcd">
                              <i className="em em-abcd"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="accept">
                              <i className="em em-accept"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="aerial_tramway"
                            >
                              <i className="em em-aerial_tramway"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="airplane"
                            >
                              <i className="em em-airplane"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="alarm_clock"
                            >
                              <i className="em em-alarm_clock"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="alien">
                              <i className="em em-alien"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="ambulance"
                            >
                              <i className="em em-ambulance"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="anchor">
                              <i className="em em-anchor"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="angel">
                              <i className="em em-angel"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="anger">
                              <i className="em em-anger"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="angry">
                              <i className="em em-angry"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="anguished"
                            >
                              <i className="em em-anguished"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="ant">
                              <i className="em em-ant"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="apple">
                              <i className="em em-apple"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="aquarius"
                            >
                              <i className="em em-aquarius"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="aries">
                              <i className="em em-aries"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_backward"
                            >
                              <i className="em em-arrow_backward"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_double_down"
                            >
                              <i className="em em-arrow_double_down"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_double_up"
                            >
                              <i className="em em-arrow_double_up"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_down"
                            >
                              <i className="em em-arrow_down"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_down_small"
                            >
                              <i className="em em-arrow_down_small"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_forward"
                            >
                              <i className="em em-arrow_forward"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_heading_down"
                            >
                              <i className="em em-arrow_heading_down"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_heading_up"
                            >
                              <i className="em em-arrow_heading_up"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_left"
                            >
                              <i className="em em-arrow_left"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_lower_left"
                            >
                              <i className="em em-arrow_lower_left"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_lower_right"
                            >
                              <i className="em em-arrow_lower_right"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_right"
                            >
                              <i className="em em-arrow_right"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_right_hook"
                            >
                              <i className="em em-arrow_right_hook"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_up"
                            >
                              <i className="em em-arrow_up"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_up_down"
                            >
                              <i className="em em-arrow_up_down"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_up_small"
                            >
                              <i className="em em-arrow_up_small"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_upper_left"
                            >
                              <i className="em em-arrow_upper_left"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrow_upper_right"
                            >
                              <i className="em em-arrow_upper_right"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrows_clockwise"
                            >
                              <i className="em em-arrows_clockwise"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="arrows_counterclockwise"
                            >
                              <i className="em em-arrows_counterclockwise"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="art">
                              <i className="em em-art"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="articulated_lorry"
                            >
                              <i className="em em-articulated_lorry"></i>
                            </li>
                            <li
                              className="emoji"
                              data-clipboard-text="astonished"
                            >
                              <i className="em em-astonished"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="atm">
                              <i className="em em-atm"></i>
                            </li>
                            <li className="emoji" data-clipboard-text="b">
                              <i className="em em-b"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        contenteditable="true"
                        onChange={(e) => chatMsg(e)}
                      />
                      <button
                        className="send-msg-btn"
                        onClick={bringDownToChats}
                      >
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <h1>Select a user to chat</h1>
          )}
        </div>
      </div>

      {/* <h1>Wellcome to React chatApp</h1>
      <div>
        {props.currentUser.displayName !== undefined ? (
          <div
            style={{ border: "5px solid #000", width: "85%", margin: "0 auto" }}
          >
            <div style={{ backgroundColor: "orange", padding: "50px" }}>
              <button type="submit" onClick={() => props.signOut()}>
                LOg out{" "}
              </button>
              <span>Current USer</span>
              <hr />
              <br />
              <h1>{props.currentUser.displayName}</h1>
              <img
                src={props.currentUser.photoURL}
                alt={props.currentUser.displayName}
              />
              <h6>{props.currentUser.email}</h6>
            </div>

            {props.allusers.length !== 0 || props.allusers === undefined ? (
              <div
                style={{
                  backgroundColor: "green",
                  width: "100%",
                  display: "flex",
                }}
              >
                <div style={{ backgroundColor: "brown", width: "50%" }}>
                  <h3>All users</h3>
                  {props.allusers.map((otherUsers, i) =>
                    otherUsers.userUid !== props.currentUser.uid ? (
                      <ul key={i}>
                        <li key={i}>
                          <img
                            src={otherUsers.userProfile}
                            alt={otherUsers.userName}
                          />{" "}
                          {otherUsers.userName}
                          <button onClick={() => chatWithOtherUser(otherUsers)}>
                            Chat
                          </button>
                        </li>
                      </ul>
                    ) : null
                  )}
                </div>
                <div style={{ backgroundColor: "yellow", width: "50%" }}>
                  <h4>Chats</h4>

                  {Object.keys(chatUser).length ? (
                    <div
                      style={{ width: "100%", backgroundColor: "lightblue" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "yellowgreen",
                        }}
                      >
                        <h5>
                          {chatUser.chatuser.userName}{" "}
                          <img
                            src={chatUser.chatuser.userProfile}
                            alt={chatUser.chatuser.userName}
                          />
                          <span>{chatUser.chatuser.userEmail}</span>
                        </h5>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: "3px solid #002f34",
                          height: "250px",
                          overflowY: "scroll",
                        }}
                      >
                        <ul>
                          {props.oldChats.map((v, i) => (
                            <li key={i}>{v.message.msg}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ width: "100%", backgroundColor: "purple" }}>
                        <input
                          onChange={(e) => chatMsg(e)}
                          type="text"
                          placeholder="Type messege..."
                        />
                        <button
                          onClick={() =>
                            props.sendMessage(
                              chatUser,
                              chats,
                              props.currentUser
                            )
                          }
                        >
                          send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h6>Start conversion with others</h6>
                  )}
                </div>
              </div>
            ) : (
              <h6>No Others users fined!</h6>
            )}
          </div>
        ) : (
          <>
            <h5>No user login currently</h5>
            <button type="submit" onClick={() => props.facebooklogin()}>
              Login{" "}
            </button>
          </>
        )}
        <br />
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentuser,
  allusers: state.Allusers,
  oldChats: state.oldChats,
});

const mapDispatchToProps = (dispatch) => ({
  facebooklogin: () => dispatch(facebooklogin()),
  check_current_user: () => dispatch(check_current_user()),
  get_All_Users: () => dispatch(get_All_Users()),
  signOut: () => dispatch(signOut()),
  sendMessage: (data, udata, cUser) =>
    dispatch(sendMessage(data, udata, cUser)),
  get_old_chats: (oldChats) => dispatch(get_old_chats(oldChats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatapp);
