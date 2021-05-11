import React, { useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../utils/baseurl";
import { toastr } from "react-redux-toastr";
import { profileServices } from "../../../services/profileServices";
export default function ProfileImage({ url, loadUser }) {
  const [loading, setLoading] = useState(false);
  const [image,setImage] = useState(url);
  const [base64Image,setBase64Image] = useState(null)
  const { id } = useParams();


  const getBase64 = (file) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          baseURL = reader.result;
          resolve(baseURL);
        };
      });
  }
  const uploadImage = async (id,image) => {
    setLoading(true);
    try {
       
        const response = await profileServices.profileUpload(id,image);
        if (response.data.success) {
          setImage(BASE_URL+response.data.data.image);
          toastr.success(response.data.message);
          setLoading(false);
          return;
        }
        toastr.error(response.data.message);
        setLoading(false);
      } catch (error) {
        toastr.error(error.response.data.message);
        setLoading(false);
      }

  }
  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    try{
        const base64 = await getBase64(file)
        let bsString = base64.split(";");
        let finalBsString = bsString[1].split(",")
        uploadImage(id,finalBsString[1]);
    }catch(error){
        console.log(error)
    }
    
  }

  const upload = () => {
    document.getElementById("selectImage").click();
  };
  return (
    <>
      <div className="img_wrp" onClick={() => upload()}>
        <Dimmer active={loading} inverted>
          <Loader />
        </Dimmer>
        <img className="mr-3" src={image} width={100} height={100} alt />
        <span className="image_picker">
        <i
          className="fa fa-camera "
          aria-hidden="true"
          
        ></i>
        </span>
      </div>
      <input id="selectImage" hidden type="file" onChange={(e) =>handleFileChange(e)}/>
    </>
  );
}
