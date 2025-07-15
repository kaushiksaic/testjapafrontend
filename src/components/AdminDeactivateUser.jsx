import axios from 'axios';
import React, { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminDeactivateUser = () => {

 const [phoneNumber,setPhoneNumber] = useState("");
 const [events,setEvents]  = useState([]);
 const [selectedEvent, setSelectedEvent] = useState("");
 const [message,setMessage] = useState("");
 const [error,setError] = useState("");

 const handleFetchEvents  = async () => {
    setMessage("");
    setError("");
    setEvents([]);
    setSelectedEvent("");

    try {

        const res = await axios.get(BASE_URL + `/user-events/${phoneNumber}`,{withCredentials:true});

        if(res.data.events && res.data.events.length > 0) {
            // const eventNames = res.data.events.map(event => event.event_name);
            setEvents(res.data.events);
        } else {
            setMessage("No active events found for this user");
        }

    } catch (err) {
        setError(err?.response?.data?.error || "Something went Wrong");
        console.error(err);
    }
 }


 const handleDeactivateUser =  async () => {
    try {

      const res = await axios.patch(BASE_URL + '/deactivate-user',{phoneNumber,event_id:selectedEvent},{withCredentials: true});
      setMessage('User successfully deactivated from the event');
      setEvents((prev)=> prev.filter((event) => event.event_id !== selectedEvent));
      setSelectedEvent("");

    } catch (err) {
        setError(err?.response?.data?.error || "Something went Wrong");
        console.error(err);
    }
 }












  return (
    <>
    <div className='flex justify-center p-4'>
        <div className='card bg-white w-full md:w-[800px] shadow-xl'>
            <div className='card-body'>
                <div>
                <h5 className='text-center font-bold'>Deactivate User</h5>
                <div className='flex items-center justify-evenly'>
                <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Phone Number / ఫోన్ నంబర్<span className='text-red-500 ps-2 text-xl'>&#42;</span></span>
  </div>
  <input type="text" placeholder="Type here" maxLength={10} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input input-bordered w-full max-w-xs" />
  </label>
  <button className="btn mt-2" onClick={handleFetchEvents}>Fetch Events</button>
  </div>
  
  </div>

{events.length > 0 && ( <div>
    <label className='label-text form-control'>Select Event</label>
    <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="select select-primary w-full max-w-xs">
  <option disabled value="">--Select Event--</option>
  {events.map(event => (
    <option key={event.event_id} value={event.event_id}>{event.event_name}</option>
  ))}
</select>

<br/>
<button className="btn btn-error mt-3" onClick={handleDeactivateUser}>Deactivate User</button>
    
    
    
    </div> )}


    {message && <p className='text-primary mt-2'>{message}</p>}
    {error && <p className='text-danger mt-2'>{error}</p>}
 
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminDeactivateUser