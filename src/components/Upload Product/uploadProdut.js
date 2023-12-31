import "./uploadProduct.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import moment from 'moment-timezone';
import { useFetcher, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// const fs = require('fs');
import data from "../../data.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UploadProduct = () => {
  const navigate = useNavigate()
  let { userType } = useParams();
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState([])
  const [average, setAverage] = useState('')
  // const [priceSuggestion, setPriceSuggestion] = useState()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState(new FormData())
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Select');
  const [location, setLocation] = useState('');
  const [jsonData, setJsonData] = useState([])
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  const [maxDate, setMaxDate] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const token = localStorage.getItem("jwtToken");
  // console.log("token", token);
  useEffect(() => {
    axios
      .get("https://product-auction-system.onrender.com/category/get-all-categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        console.log('data', data)
        setCategories(data)
        setCategoryTitle(data.length > 0 ? "Select" : "");
        setCategory(data.length > 0 ? data[0]._id : '');
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    console.log('categoryTitle...', categoryTitle)
    console.log('condition...', condition)

    console.log("not entered")
    if (categoryTitle !== "Select" && condition !== "Select") {
      console.log("entered")
      const result = calculateSumAndAverage(categoryTitle, condition);
      console.log(`Average: ${result.average}`);
      setPrice(result.average);

    }


  }, [categoryTitle, condition])
  const Categories = (target) => {
    console.log('target Categories', target.selectedOptions)
    const selectedOption = target.selectedOptions[0];
    console.log('selectedOption:', selectedOption);
    const id = selectedOption.value
    const title = selectedOption.getAttribute("data-title");
    console.log('Selected category ID:', id);
    console.log('Selected category title:', title);
    if (id === 'Select' && title === null) {
      console.log('selected...', id)
      return;
    }
    setCategory(id)
    setCategoryTitle(title)
  }

  const handleConditionChange = (event) => {
    console.log('event.target.value Condition', event.target.value)
    const selectedOption = event.target.value;
    console.log('handle condition', selectedOption);
    //  const id = selectedOption.value;
    //  console.log('id', id);
    if (selectedOption === 'Select') {
      console.log('selectedOption...', selectedOption)
      return;
    }
    setCondition(selectedOption)
  }

  function calculateSumAndAverage(category, condition) {
    let count = 0;
    let sum = 0;
    console.log('data data.json', data)
    const lowercaseCategory = category.toLowerCase();
    console.log('lowercaseCategory', lowercaseCategory)
    const lowercaseCondition = condition.toLowerCase();
    console.log('lowercaseCondition', lowercaseCondition)
    let getJSONData = localStorage.getItem('jsonData')
    if (getJSONData) {
      getJSONData = JSON.parse(getJSONData)
      console.log('getJSONData', getJSONData)
      data = []
      console.log('data....', data)
      console.log('getJSONData length....', Object.keys(getJSONData).length)
      data = getJSONData;
      console.log('enter')
    }

    console.log('final data', data)
    console.log('final data length', data.length)
    for (let i = 0; i < data.length; i++) {
      const lowercaseProductCategory = data[i].productCategory.toLowerCase();
      const lowercaseProductCondition = data[i].productCondition.toLowerCase();
      if (lowercaseProductCategory === lowercaseCategory && lowercaseProductCondition === lowercaseCondition) {
        count++;
        sum += data[i].price;
        console.log('sum++', sum)
      }
    }
    console.log('sum', sum)
    let average = count > 0 ? sum / count : setAverage(0);
    average = Math.round(average ? average : 0);
    console.log('average', average)

    toast.success(`price suggestion of ${category} is ${average}`);
    return {
      count,
      sum,
      average
    };
  }
  const handePhoto = (e) => {
    e.preventDefault();
    const newformData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      setPhoto(e.target.files[i])
      newformData.append('photo', e.target.files[i])
    }
    setFormData(newformData);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log("title", title)
    console.log('category', category)
    console.log("description", description)
    console.log("brand", brand)
    console.log("price", price)
    console.log("condition", condition)
    console.log("location", location)
    console.log("userType", userType)
    console.log("selectedDate", selectedDate)
    console.log("average...", average)
    // const timezone = moment.tz.guess(); // get the user's timezone
    // const selectedDateTimezone = moment.tz(selectedDate, timezone); // convert the selected date to the user's timezone
    // setSelectedDate(selectedDateTimezone.format()); // store the selected date and timezone in state

    if (average === 0) {
    console.log('zero average', average)
    const newData = {
      "productTitle": title,
      "productCategory": categoryTitle,
      "productCondition": condition,
      "price": price
    };
    console.log('newData', newData)

    axios
      .post("https://product-auction-system.onrender.com/product/submit", newData, {
      })
      .then((response) => {
        const data = response.data;
        console.log('data submit', data)
        localStorage.setItem('jsonData', JSON.stringify(data))
        console.log('getJSONData from api....', Object.keys(data).length)
        setJsonData(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    }
    console.log('photo', photo)
    if (title === "" || description === "" || brand === "" || price === "" || location === "") {
      toast.error('Please fill all fields!');
      return;
    }
    const obj = {
      title: title,
      category: category.id,
      description: description,
      brand: brand,
      price: price,
      condition: condition,
      location: location,
      photo: photo,
      userType: userType,
      selectedDate: selectedDate
    }
    console.log("whole object is", obj);
    const token = localStorage.getItem("jwtToken");
    console.log("token", token);

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("location", location);
    formData.append("photo", formData);
    formData.append("userType", userType);
    formData.append("selectedDate", selectedDate);
    axios
      .post("https://product-auction-system.onrender.com/product/upload-product", formData, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data"
      })
      .then((response) => {
        console.log("response", response);
        toast.success('Product has been uploaded!');
        navigate('/')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  function getTitleById(id) {
    const selectedOption = categories.find(option => option._id === id);
    // console.log('getTitleById', selectedOption)
    // console.log('getTitleById selectedOption', selectedOption?.title)

    return selectedOption ? selectedOption.title : "";
  }
  return (
    <div class="container mt-4 mb-4">
      <ToastContainer />
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
      <br />
      <h2>Upload a Product</h2>
      <form method="post" enctype="multipart/form-data" onSubmit={submit}>
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" class="form-control" id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label for="category">If  <b> Category is not avalable </b>then upload category first :

          <Link className="logOutLink" to="/upload-category">

            <a className="text-dark" href="" style={{ fontSize: '18px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}>

              <span class="mx-2">Upload Category</span>
            </a>
          </Link>
        </label>
        &nbsp;&nbsp;
        <div class="form-group">
          <label for="category">Choose Category</label>

          <select class="form-control" id="title" name="title" onChange={(event) => Categories(event.target)}>

            <option value="Select">Select One</option>
            {categories.map(option => (
              <option key={option._id} value={option._id} data-title={option.title}>{option.title}</option>
            ))}
          </select>
          <p>{`You selected ${category} - ${getTitleById(category)}`}</p>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea class="form-control" id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div class="form-group">
          <label for="brand">Brand Name:</label>
          <input type="text" class="form-control" id="brand" name="brand" onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="condition">Condition:</label>
          <select class="form-control" id="condition" name="condition" onChange={handleConditionChange}>
            <option value="Select">Select One</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" class="form-control" id="price" value={price}
            name="price" min="1" onChange={(e) => setPrice(e.target.value)} />
        </div>
        
        {/* value={condition} */}
        <div class="form-control">
          <label for="product-images">Product Images:</label>

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handePhoto}
            multiple
          />
        </div>

        <label htmlFor="date-input">Select a date within the next 7 days:</label>
        <input type="date" id="date-input" class="form-control" name="date-input" min={minDate} max={maxDate} onChange={handleDateChange} />
        {selectedDate && <p>You selected: {selectedDate}</p>}

        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" class="form-control" id="location" name="location" onChange={(e) => setLocation(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-dark">Upload Product</button>
      </form>
    </div>
  );
};
export default UploadProduct;
