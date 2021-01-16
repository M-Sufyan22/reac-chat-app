import Logo  from '../assets/images/logo.svg';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { facebooklogin,check_current_user,get_All_Users,get_old_chats,sendMessage,signOut} from '../store/action';
import { Sling as Hamburger } from 'hamburger-react'
import userimg from '../../src/assets/images/fahad.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// 
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


function Chatapp(props){

    const [chatUser,setchatUser] = useState({});
    const [chats,setChats] = useState({});
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
   


    useEffect(()=>{
      props.check_current_user();       
      props.get_All_Users();    
    
    },[])
    
    const uid_merge = (uid1, uid2) => {
      if (uid1 < uid2) {
          return uid1 + uid2
      } else {
          return uid2 + uid1
      }
    } 
    // props.signOut()
    const getRecentChats = (s) => {
      let curtUid = props.currentUser.uid;
      let chatUid =s.userUid;
      props.get_old_chats(uid_merge(curtUid,chatUid))
    }
    
    const chatWithOtherUser =(s)=>{
      setchatUser({chatuser:s})   
      getRecentChats(s)
    }
    
    const chatMsg= (e) =>{
      setChats({chats:e.target.value})
    }
    
    const showAbout = () =>{
        if(isAbout === true){
          setAbout(false)
        }else{
          setAbout(true)
        }
    }
    const openSettings = () =>{
        if(settings === true){
          setSettings(false)
        }else{
          setSettings(true)
        }
    }

    const openCity = (evt, cityName) => {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "flex";
      evt.currentTarget.className += " active";
    }
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    const IOSSwitch = (themes) => {
      return (
        <Switch />
      );
    };
    const showEdit= ()=>{
      if(editSec === true){
        seteditSec(false)
      }else{
        seteditSec(true)
      }
    if(faq === true){
        setfaq(false)
      }
    }
    const showFaq= ()=>{
      if(faq === true){
        setfaq(false)
      }else{
        setfaq(true)
      }
      if(editSec === true){
        seteditSec(false)
      }
    }

    return(
        <>    
        <div className="dashboard-container">
            <div className="side-menu-btn">
              <div className="navbar-icon-open"><Hamburger label="Show menu" rounded easing="cubic-bezier(.91,.76,.14,.8)" duration={0.7} distance="sm" size={25} color="#fff" toggled={isOpen} toggle={setOpen} /></div>
            </div>
          <div className="side-menu"  style={isOpen  ? {marginLeft:"0"}  : {marginLeft:"-60px"} }>
            <div className="navs">
                <ul role="tablist" className="side-menu-nav">
                    <li id="profile" className="nav-item tablinks" title="About" onClick={(e)=>openCity(e, 'AboutUser')}><a className="nav-link"><i className="fa fa-user"></i></a></li>
                    <li id="Chats" className="nav-item tablinks" title="Messages" onClick={(e)=>openCity(e, 'ChatWithOthers')}><a  className="nav-link"><i className="fa fa-commenting"></i></a></li>
                   
                    <li id="Groups" className="nav-item tablinks" title="Settings" onClick={(e)=>openCity(e, 'Tokyo')}><a className="nav-link"><i className="fa fa-gear"></i></a></li>
                </ul>
                <ul role="tablist" className="side-menu-nav">
                      <a className="nav-link lightDarkSwitch">
                      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="#9aa1b9"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
                       </a>
                    <li id="Groups" ><a className="nav-link"><img title="user Profile Image" src={userimg} alt="" className="profile-user"/></a></li>
                </ul>
            </div>
          </div>
          <div className="chat-left-side">
            {/* USer About Section Start */}
            <div id="AboutUser" className="tabcontent">
        
                <div className="sm-row opnSet"  ><h4>My Profile</h4>
                <i className="fa fa-ellipsis-v " aria-hidden='true' onClick={openSettings}></i>
                  <div className="drop-down-settings" style={settings ? {top:"45px",visibility:"visible"}:{top:"80px",visibility:"hidden"}}>
                    <button type="button" tabindex="0" role="menuitem" class="dropdown-item">Edit</button>
                    <button type="button" tabindex="0" role="menuitem" class="dropdown-item">Help</button>
                    <div tabindex="-1" class="dropdown-divider"></div>
                    <button type="button" tabindex="0" role="menuitem" class="dropdown-item">Setting</button>
                    </div>
                </div>
                <div className="sm-row-c" style={{flexDirection:"column"}}><img src={userimg} alt="fa" className="main-profile-img"/><h5 className="u-name">John</h5><p className="text-muted" style={{position:'relative'}}><span className="activeIcon"></span>Active</p></div>
                <div className="detail-box">
                  <div className="detail-box-top" onClick={showAbout}><h5><i className="fa fa-user text-muted" aria-hidden="true"></i> About</h5>{isAbout ? <i className="fa fa-caret-up text-muted" aria-hidden="true"></i>:<i className="fa fa-caret-down text-muted" aria-hidden="true"></i>}</div>
                  <div className="detail-box-bottom" style={isAbout ? {height:"280px"}: {height:"0px"} }>
                  <div >
                      <div class="card-body">
                        <div><p class="text-muted">Name</p><h5>Patricia Smith</h5></div>
                        <div class="mt-4"><p class="text-muted">Email</p><h5>adc@123.com</h5></div>
                        <div class="mt-4"><p class="text-muted">Time</p><h5>40 AM</h5></div>
                        <div class="mt-4"><p class="text-muted">Location</p><h5>California, USA</h5></div>
                      </div>
                  </div>
                  </div>
                </div>
            </div>
            {/* USer About Section End */}

            {/* Recently Chats With others section start*/}
            <div id="ChatWithOthers" className="tabcontent">
             
                <div className="sm-row opnSet"  ><h4>Chats</h4></div>
                <div className="sm-row-c" style={{flexDirection:"column"}}>
                  <div className="search-bar">
                    <span className="searchIcon text-muted"><i className="fa fa-search" aria-hidden="true"></i></span>
                    <input type="text" name="search" id="search" placeholder="search messages or users"/>
                  </div>
                </div>
                <div className="sm-row-c">
                <Swiper
      spaceBetween={10}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div>
        </SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
      <SwiperSlide><div className="profile-mini-card">
          <div className="mini-card-wrapper">
            <span className="mini-card-user-img"><img src={userimg} alt=""/></span>
            <p className="mini-card-username">Sufyan</p>
          </div>
        </div></SwiperSlide>
    </Swiper>
                </div>
                <div className="sm-row"  ><h3>Recent</h3></div>
                <div className="sm-row-c">
                    <ul className="recent-msg-wrapper">
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                    <li>
                      <div className="recent-u-img"><img src={userimg} alt=""/></div>
                      <div className="recent-u-msg"><h6 className="text-muted">John</h6><p className="text-muted">Hello... How are you?</p><span className="lst-msg-rec-time text-muted">2:56 Pm</span></div>
                    </li>
                   
                    </ul>
                </div>
            </div>
              
            {/* Recently Chats With others section End*/}

            <div id="Tokyo" className="tabcontent">
             
   
            <div className="sm-row opnSet"  ><h4>Settings</h4></div>
                <div className="sm-row-c" style={{flexDirection:"column"}}>
                  <img src={userimg} alt="fa" className="main-profile-img"/>
                  <h5 className="u-name">John</h5><p className="text-muted" style={{position:'relative'}}>
                    <span className="activeIcon"></span>Active</p></div>
                <div className="detail-box">
                  <div className="detail-box-top" onClick={showEdit}>
                    <h5><i className="fa fa-pencil text-muted" aria-hidden="true"></i> Edit</h5>{isAbout ? <i className="fa fa-caret-up text-muted" aria-hidden="true"></i>:<i className="fa fa-caret-down text-muted" aria-hidden="true"></i>}</div>
                  <div className="detail-box-bottom" style={editSec ? {height:"280px"}: {height:"0px"} }>
                  <div >
                      <div class="card-body">
                        <button className="Edit-btn btn  btn-light"><i className="fa fa-pencil-square-o text-muted" aria-hidden="true"></i>Edit</button>
                        <div><p class="text-muted">Name</p><h5>Patricia Smith</h5></div>
                        <div class="mt-4"><p class="text-muted">Email</p><h5>adc@123.com</h5></div>
                        <div class="mt-4"><p class="text-muted">Time</p><h5>40 AM</h5></div>
                        <div class="mt-4"><p class="text-muted">Location</p><h5>California, USA</h5></div>
                      </div>
                  </div>
                  </div>
                </div>
                <div className="detail-box">
                  <div className="detail-box-top" onClick={showFaq}><h5><i className="fa fa-question-circle text-muted" aria-hidden="true"></i> Help</h5>{isAbout ? <i className="fa fa-caret-up text-muted" aria-hidden="true"></i>:<i className="fa fa-caret-down text-muted" aria-hidden="true"></i>}</div>
                  <div className="detail-box-bottom" style={faq ? {height:"180px"}: {height:"0px"} }>
                  <div >
                      <div class="card-body">
                        <div><h5>FAQS</h5></div><div tabindex="-1" class="dropdown-divider"></div>
                        <div class="mt-4"><h5>Contact</h5></div><div tabindex="-1" class="dropdown-divider"></div>
                        <div class="mt-4"><h5>Privacy & Policy</h5></div>
                     
                      </div>
                  </div>
                  </div>
                </div>
         
            </div>
            </div>
          <div className="chat-screen">
              <div className="chat-screen-top">
                <div className="other-user-meta"><img src={userimg} alt=""/><h3>Fahad</h3></div>
                <div>
                  <button className="delAll-btn"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
              </div>
              <div className="chat-board">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                  <li>11</li>
                  <li>23</li>
                  <li>13</li>
                  <li>14</li>
                  <li>15</li>
                  <li>16</li>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                  <li>11</li>
                  <li>23</li>
                  <li>13</li>
                  <li>14</li>
                  <li>15</li>
                  <li>16</li>        <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                  <li>11</li>
                  <li>23</li>
                  <li>13</li>
                  <li>14</li>
                  <li>15</li>
                  <li>16</li>        <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                  <li>11</li>
                  <li>23</li>
                  <li>13</li>
                  <li>14</li>
                  <li>15</li>
                  <li>16</li>        <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                  <li>11</li>
                  <li>23</li>
                  <li>13</li>
                  <li>14</li>
                  <li>15</li>
                  <li>16</li>
                  <div class="btm"></div> 
                </ul>
              </div>
              <div className="send-chat-area">
                <button className="delAll-btn"><i className="fa fa-paperclip" aria-hidden="true"></i></button>
                <form action="" >
                  <div className="send-msg-field">
                    <input type="text" name="message" id="message" placeholder="Type a message..."/>
                    <button className="delAll-btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                  </div>
                </form>
              </div>
          
          </div>
       </div>



{/* 
        <h1>Wellcome to React chatApp</h1>
        <div>
       {props.currentUser.displayName !== undefined ?
      <div style={{border: "5px solid #000",width:"85%",margin:"0 auto"}}>
          <div style={{backgroundColor:"orange",padding: "50px"}}>
          <button type='submit' onClick={()=>props.signOut()}>LOg out </button><span>Current USer</span>
                <hr/><br/>
              <h1>{props.currentUser.displayName}</h1>
              <img src={props.currentUser.photoURL} alt={props.currentUser.displayName}/>
              <h6>{props.currentUser.email}</h6>
          </div>
      
          {props.allusers.length !==0  || props.allusers=== undefined  ? 
          <div style={{backgroundColor:"green",width: "100%",display:"flex"}}>
            <div style={{backgroundColor:"brown",width: "50%"}}>
              <h3>All users</h3>
              {props.allusers.map((otherUsers,i) =>
                otherUsers.userUid !== props.currentUser.uid ?
                <ul key={i}>
                  <li key={i}><img src={otherUsers.userProfile} alt={otherUsers.userName}/> {otherUsers.userName} 
                  <button onClick={()=>chatWithOtherUser(otherUsers)}>Chat</button>
                  </li>
                </ul>:null)
              }
            </div>
            <div style={{backgroundColor:"yellow",width: "50%"}}>
              <h4>Chats</h4>
          
              {Object.keys(chatUser).length ?
              <div style={{width:"100%",backgroundColor:"lightblue"}}>
                   <div style={{width:"100%",backgroundColor:"yellowgreen"}}>
                    <h5>{chatUser.chatuser.userName} <img src={chatUser.chatuser.userProfile} alt={chatUser.chatuser.userName}/>
                    <span>{chatUser.chatuser.userEmail}</span></h5>
                  </div>
                <div style={{width:"100%", border:"3px solid #002f34",height:"250px", overflowY:"scroll"}}>
                      <ul>
                   {props.oldChats.map((v,i)=> <li key={i}>{v.message.msg}</li>)}
                   </ul>

                </div>
              <div style={{width:"100%", backgroundColor:"purple"}}>
                <input onChange={(e)=>chatMsg(e)} type="text" placeholder="Type messege..."/>
                <button onClick={()=>props.sendMessage(chatUser,chats,props.currentUser)}>send</button>
              </div>
              </div>
                :<h6>Start conversion with others</h6>}
            </div>
          </div>
            :<h6>No Others users fined!</h6>}
      </div>
  
        :<><h5>No user login currently</h5><button type='submit' onClick={()=>props.facebooklogin()}>Login </button></>
        }
        <br/>
        
    </div>
    
     */}
    
    
    </>
    
    );
}


const mapStateToProps = (state)=>({
    currentUser: state.currentuser,
    allusers: state.Allusers,
    oldChats: state.oldChats 
});
  
const mapDispatchToProps = (dispatch)=>({
    facebooklogin: ()=> dispatch(facebooklogin()),
    check_current_user: ()=> dispatch(check_current_user()),
    get_All_Users: ()=> dispatch(get_All_Users()),
    signOut: ()=> dispatch(signOut()),
    sendMessage : (data,udata,cUser)=> dispatch(sendMessage(data,udata,cUser)),
    get_old_chats: (oldChats)=> dispatch(get_old_chats(oldChats)),    
});
  
export default connect(mapStateToProps,mapDispatchToProps)(Chatapp);
