import errorImg from "../Images/imgerror.jpg"
import { Link } from "react-router-dom";
const ErrorScreen=()=>{

  return <>
    <div className="error-container">
        <img src={errorImg} alt="" className="error-img" height={320} width={450}/>
        <h1 className="error-msg">Page Not Found</h1>
        <Link to="/">
        <button className="btn homebtn">Go Back</button>
        </Link>
    </div>
  </>
}

export default ErrorScreen;