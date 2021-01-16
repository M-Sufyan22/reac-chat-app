import LoginSignup from '../components/loginSignup';
import Chatapp from '../components/Chatapp';
import '../assets/css/index.css';
import { connect } from 'react-redux';
import Home from '../components/Chatapp'
function App(props){

    return(
       <>
        {/* {props.currentUser.displayName !== undefined ? <Chatapp/>: <div className="main-container"><LoginSignup/></div>} */}
        <Home/>
       </>
    );
};


const mapStateToProps = (state)=>({
    currentUser: state.currentuser,
});
    
export default connect(mapStateToProps,null)(App);

