import React , {useEffect} from "react";
import {
  TheNavHeader,
  TheSidebar,
  TheHeader,
  TheFooter,
  TheContent,
} from "./index";
export default function TheLayout(props) {
  useEffect(() => {
      console.log("Layut Render")
     
  }, [])
  return (
    <div id="main-wrapper" className="show">
      <TheNavHeader {...props} />
      <TheHeader {...props} />
      <TheSidebar {...props} />
      <TheContent {...props} />
      <TheFooter  {...props}/>
    </div>
  );
}
