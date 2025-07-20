/* eslint-disable no-unused-vars */
import FadeLoader from "react-spinners/FadeLoader";
import { useState } from "react";
const Loader = () => {
  
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'100px'}}>
      <div className="sweet-loading text-center">
        <FadeLoader
          color="#000"
          loading={loading}
          size={200}
        />
      </div>
    </div>
  );
};

export default Loader;


