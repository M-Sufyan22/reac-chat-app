import Logo  from '../assets/images/logo.svg';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { facebooklogin, check_current_user,get_All_Users} from '../store/action';
import '../assets/css/index.css';

function LoginSignup(props) {

  useEffect(()=>{
    props.check_current_user();       
    props.get_All_Users();    
  },[])

  return (
    <div className="wrapper">
          <div className="inner-box">
                <div className="top-login-logo">
                    <img src={Logo}  alt="chat Board"/>
                    <h3>Chat Board</h3>
                </div>
                <div className="login-form-box">
                   <button className="login-btn"  onClick={()=>props.facebooklogin()}><i  className="fa fa-facebook bord" aria-hidden="true"></i>Login with facebook</button>
                </div>
          </div>
    </div>
  );
}


const mapDispatchToProps = (dispatch)=>({
  facebooklogin: ()=> dispatch(facebooklogin()),
  check_current_user: ()=> dispatch(check_current_user()),
  get_All_Users: ()=> dispatch(get_All_Users()),
});

export default connect(null,mapDispatchToProps)(LoginSignup);
