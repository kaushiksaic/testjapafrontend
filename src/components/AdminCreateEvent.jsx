import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AdminCreateEvent = () => {

  const {eventId} = useParams(); 

const [formData,setFormData] = useState({
    org_id: '',
    event_name: '',
    event_maxcount: '',
    event_mincount: '',
    start_date: '',
    end_date: '',
    principle_coordinator: '',
    coordinator_mobilenum: '',
    event_mode: '',
    event_type: '',
    event_place: '',
    event_icon: '',
    event_status: '',

})

const [error,setError] = useState("");
const [message,setMessage] = useState("");

useEffect(() => {
  if(eventId) {
    fetchEventData(eventId);
    console.log('fetching event data')
  }
},[eventId])



const fetchEventData = async (eventId) => {
   try {
      const res = await axios.get(BASE_URL + `/event/${eventId}`,{withCredentials:true})
      setFormData(res.data.data[0])
   } catch (err) {
    setError(err?.response?.data?.error || "Something went Wrong");
    console.error(err);
   }
}


const handleChange = (e) => {
 const {name,value}  = e.target;
 
 setFormData({...formData,[name]:value});
}


const handleSubmit =  async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');
  try {

    if(eventId) {
      await axios.patch(BASE_URL + `/update/event/${eventId}`,formData,{withCredentials: true});
      setMessage('Event Updated Successfully');
    } else {

   const res = await axios.post(BASE_URL + '/createevent',formData,{withCredentials:true})
    setMessage('Event Created Successfully');
    Navigate('/list-events')
    }
  } catch (err) {
    setError(err?.response?.data?.error || "Something went Wrong");
    console.error(err);
  }
}



  return (
    <>
    <div className='flex justify-center items-center min-h-screen p-4'>
        <div className="card bg-white w-full md:w-[800px] shadow-xl">
      <div className="card-body">
      <h5 className='text-center font-bold text-3xl mb-2'>Create Event</h5>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}
      <div className='text-end'><span className='text-red-500 pe-2 text-xl'>&#42; Mandatory Fields</span></div>
      <form onSubmit={handleSubmit} className="">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
        <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Organization ID<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" maxLength={10} name='org_id' value={formData.org_id} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Name<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='event_name' value={formData.event_name} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Max Count<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='event_maxcount' value={formData.event_maxcount} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      
      
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Daily Min Count<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='event_mincount' value={formData.event_mincount} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Start Date<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
    <DatePicker
  selected={formData.start_date ? new Date(formData.start_date) : null}
  onChange={(date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...formData, start_date: formattedDate });
  }}
  dateFormat="yyyy-MM-dd"
  placeholderText="yyyy-mm-dd"
  className="input input-bordered w-full max-w-xs"
/>
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">End Date</span>
      </div>
     <DatePicker
  selected={formData.end_date ? new Date(formData.end_date) : null}
  onChange={(date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...formData, end_date: formattedDate });
  }}
  dateFormat="yyyy-MM-dd"
  placeholderText="yyyy-mm-dd"
  className="input input-bordered w-full max-w-xs"
/>
      </label>
     
    
      
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Principle Coordinator<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='principle_coordinator' value={formData.principle_coordinator} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Coordinator Mobile Number<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='coordinator_mobilenum' value={formData.coordinator_mobilenum} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Mode</span>
      </div>
      <input type="text" placeholder="Type here" name='event_mode' value={formData.event_mode} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      {/* <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Type<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <input type="text" placeholder="Type here" name='event_type' value={formData.event_type} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label> */}
       <label className="form-control w-full max-w-xs">
<div className="label">
        <span className="label-text">Event Type<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
      </div>
      <select className="select select-bordered w-full max-w-xs" name='event_type' value={formData.event_type} onChange={handleChange}>
  <option disabled defaultValue value="">Select Event Type</option>
  <option value="parayanam">Parayanam</option>
  <option value="japam">Japam</option>
</select>
        </label>

      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Place</span>
      </div>
      <input type="text" placeholder="Type here" name='event_place' value={formData.event_place} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Event Icon URL</span>
      </div>
      <input type="text" placeholder="Type here" name='event_icon' value={formData.event_icon} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label>
      {/* <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Status</span>
      </div>
      <input type="text" placeholder="Type here" name='event_status' value={formData.event_status} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
      </label> */}
        <label className="form-control w-full max-w-xs">
<div className="label">
        <span className="label-text">Status</span>
      </div>
      <select className="select select-bordered w-full max-w-xs" name='event_status' value={formData.event_status} onChange={handleChange}>
  <option disabled defaultValue value="">Select Status</option>
  <option value="Active">Active</option>
  <option value="Inactive">InActive</option>
</select>
        </label>
      
      </div>
     
        <div className="card-actions justify-center mt-3">
          <button className="btn btn-primary w-full text-lg" type='submit'>
          {eventId ? 'Update Event' : 'Create Event'}
            </button>
        </div>
        </form>
        </div>
        </div>
        </div>
    </>
  )
}

export default AdminCreateEvent