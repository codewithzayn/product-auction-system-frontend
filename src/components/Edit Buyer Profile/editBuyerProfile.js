import "./editBuyerProfile.css";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";
const EditBUyerProfile = () => {
  const navigate = useNavigate()

  let formData = new FormData()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [photo, setPhoto] = useState('');
  const printToast=(status) =>{
    console.log('printToast')
    return new Promise((resolve, reject) => {
      // Simulate an API call that takes 2 seconds to complete
      setTimeout(() => {
        if (status === 200) {
          toast.success('Profile has been updated');
          resolve(status);
        } else {
          toast.error();
          reject(new Error());
        }
      }, 2000);
    });
  }
  const submit = () => {

    console.log(name)
    console.log(email)
    console.log(mobile)
    console.log(city)
    console.log(country)
    const obj = {
      name: name,
      email: email,
      mobile: mobile,
      city: city,
      country: country,
    }
    console.log("whole object is", obj);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("photo", photo);

    console.log('formData', formData)
    const token = localStorage.getItem("jwtToken");
    console.log("token", token);

    axios
      .put("http://localhost:1337/userProfile/edit-user-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data"
      })
      .then((response) => {
        console.log("response", response);
        console.log("response data", response.data);
        console.log('response.data.photo', response.data.data.photo)
        const photo = response.data.data.photo
        localStorage.setItem('photo',photo);
        setPhoto(photo)
        printToast(response.status)
        navigate('/')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  const handePhoto = (e) => {
    e.preventDefault();
    console.log(e.target.files[0])
    setPhoto(e.target.files[0])
  }

  useEffect(() => {
    console.log('photo useeffect', photo)
    const storedPhoto = localStorage.getItem('photo');
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, [])

  const buttonStyles = {
    backgroundColor: '#0bc096',
    color: '#fff',
    borderColor: '#0bc096',
    borderRadius:"25px"
  };
  return (
    <>
       <div class="container pt-5">
          <Link to="/">
            <button
              type="button"
              style={buttonStyles}
              class="btn btn-dark"
              data-mdb-ripple-color="dark"
            >
              <i class="bi bi-arrow-right"></i>
            Back to Profile
            </button>
          </Link>
      </div>
      <form method="post" enctype="multipart/form-data" >
        <div class="container rounded pt-5 mb-5 ">
        
        <ToastContainer />
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                {photo &&
                  <img class="rounded-circle mt-5" width="150px" height="200px" src={`http://localhost:1337/images/${photo}`} />
                }
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={handePhoto}
                />
                <span class="font-weight-bold">Edit Image</span><span> </span>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="name" onChange={(e) => setName(e.target.value)} /></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" onChange={(e) => setMobile(e.target.value)} /></div>
                  <div class="col-md-12"><label class="labels">City</label><input type="text" class="form-control" placeholder="city" onChange={(e) => setCity(e.target.value)} /></div>
                  <div class="col-md-12"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" onChange={(e) => setCountry(e.target.value)} /></div>
                </div>
             
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" style={buttonStyles} on onClick={submit}>Save Profile</button></div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 py-5">
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default EditBUyerProfile;