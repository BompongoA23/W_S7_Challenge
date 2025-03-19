import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
  fullName: yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required(),
  size: yup.string()
    .oneOf(["S", "M", "L"], validationErrors.sizeIncorrect)
    .required("Size is required"),
});

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
 
const[formData,setFormData]=useState({fullName:"", size:"",toppings:[]})
const[errors,setErrors]=useState({});
const[successMessages,setSuccessMessages]=useState("")
const[formSuccess,setFormSuccess]=useState(null)

const validateForm = async () => {
    try {
      await formSchema.validate({...formData, fullName:formData.fullName.trim()}, { abortEarly: false });
      setErrors({});
    } catch (err) {
      let newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };
useEffect(() => {
 
  

  validateForm();
}, [formData]);

const handleChange = (e) => {
  
  const{name,value} = e. target;
  setFormData({...formData, [name]: value})
}

const handleCheckboxChange = (event) => {
  const { value, checked } = event.target;

  setFormData((prevData) => ({
    ...prevData,
    toppings: checked
      ? [...prevData.toppings, value] 
      : prevData.toppings.filter((id) => id !== value), 
  }));


  
}
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await formSchema.validate(formData, { abortEarly: false });
    setErrors({});

    
    const response = await axios.post('http://localhost:9009/api/order', formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    

    setFormData({ fullName: "", size: "", toppings: [] });
    setFormSuccess(true);
    setSuccessMessages(response.data.message);

  } catch (err) {
    if (err.name === "ValidationError") {
      let newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    } else {
      console.error("Order submission error:", err);
    }
    setFormSuccess(false);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {formSuccess && <div className='success'>{successMessages} </div>}
      {formSuccess === false && (
  <div className='failure'>{Object.values(errors)[0]}</div>
)}


      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" 
            id="fullName"
            type="text" 
            onChange ={handleChange} 
            name="fullName"
            value={formData.fullName}
            />
        </div>
    {errors.fullName && <div className='error'>{errors.fullName} </div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size"
            onChange={handleChange}
            name="size"
            value={formData.size}
          >
            <option value="">----Choose Size----</option>
            <option value ="S">Small</option>
            <option value ="M">Medium</option>
            <option value ="L">Large</option>
            {/* Fill out the missing options */}
          </select>
          
        {errors.size && <div className='error'>{errors.size}</div>}
        </div>
        {/* {true && <div className='error'>Bad value</div>} */}
      </div>

        <div className="input-group">
          <label>Toppings:</label>
          {toppings.map((topping) =>(
            <label key={topping.topping_id}>
            <input
              type="checkbox"
            name="toppings"
            value={topping.topping_id}
            checked= {formData.toppings.includes(topping.topping_id)}
            onChange={handleCheckboxChange}
            />
      
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {topping.text}
        </label>
          ))}
           {errors.toppings && <div className="error">{errors.toppings}</div>}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input  type="submit" disabled={formData.fullName.trim().length < 3 || !formData.size }/>
       
      
    </form>
  )
}
