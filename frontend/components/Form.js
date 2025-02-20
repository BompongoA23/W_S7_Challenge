import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
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
    .required("Full name is required"),
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
const[error,setErrors]useState({});


const handleChange = (e) => {
  const{name,value} = e. target;
  setFormData({...formData, [name]: value})
}

const handleCheckboxChange = (e) =>{
  const{name, cheked}= e.target
  let updatedToppings = checked
  ?[...formData.toppings, name]
  :formData.toppings.filter((topping) => topping !== name);

  setFormData({...formData, toppings: updatedToppings})
}

  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            <option value ="S">Small</option>
            <option value ="M">Medium</option>
            <option value ="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        <label key="1">
          <input
            name="Pepperoni"
            type="checkbox"
          />
          Pepperoni<br />
        </label>
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" />
    </form>
  )
}
