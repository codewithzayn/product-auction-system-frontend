// import "./categories.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { useNavigate } from "react-router-dom";
 import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
const UploadCategories = () => {
    const navigate = useNavigate()
//   let formData = new FormData()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
//   const [photo, setPhoto] = useState('');
//   const handePhoto = (e) => {
//     e.preventDefault();
//     console.log('e.target.files[0]',e.target.files[0])
//     setPhoto(e.target.files[0])
//   }

  const submit = (e) => {
    e.preventDefault();
    console.log('title',title)
    console.log('description',description)
    // console.log('photo', photo)
    if(title==="" || description==="")
    {
      toast.error('Please fill all fields!');
      return;
    }
    const obj = {
      title,
      description,
    //   photo,
    }
    console.log("whole category object is", obj);
    const token = localStorage.getItem("jwtToken");
    console.log("token", token);
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("photo", photo);
    axios
      .post("http://localhost:1337/category/upload-Category", obj, {
        headers: { Authorization: `Bearer ${token}` },
        // "Content-Type": "multipart/form-data"
      })
      .then((response) => {
        console.log("response", response);
         toast.success('Category has been uploaded!');
         navigate(`/upload-prod/${1}`)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  return (
    <div class="container mt-4 mb-4">
      <div class="pt-3">
          <Link className="logOutLink" to="/seller-dashboard/1">
            <button
              type="button"
              class="btn btn-dark col-md-12"
              data-mdb-ripple-color="dark"
            >
              Back to Dashboard
            </button>
          </Link>
        </div>
      <ToastContainer />
      <h2>Upload Category</h2>
      <form method="post" enctype="multipart/form-data" onSubmit={submit}>
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" class="form-control" id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea class="form-control" id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        {/* <div class="form-group">
          <label for="category-image">Category Image</label>
          <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={handePhoto}
                />
        </div> */}
        <button type="submit" class="btn btn-dark">Upload Category</button>
      </form>
    </div>
  );
};
export default UploadCategories;
