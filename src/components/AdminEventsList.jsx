import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Link, useNavigate,} from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const AdminEventsList = () => {

const [eventsData,setEventsData] = useState([]);
const [error,setError] = useState("");
const navigate = useNavigate();


useEffect(() => {

  const handleEventsData = async () => {
    try {
      const res =  await axios.get(BASE_URL + '/listevents',{withCredentials:true})
      if(res.data) {
        setEventsData(res.data.events);
      }
    }  
    catch (err) {
      setError(err?.response?.data?.error || "Something went Wrong");
      console.error(err);
    }
  }
  handleEventsData();
},[]);



const handleEdit = (eventId) => {
  navigate(`/create-event/${eventId}`)
}


  return (
    <>
    <div className="card lg:card-side bg-base-100 shadow-xl mx-5 my-5">
  <div className="card-body">
    <div className='flex justify-between align-middle'>
    <h2 className="card-title">List of Events</h2>
    <div className=''>
      <Link className="btn btn-active btn-primary" to='/create-event'>Create Event</Link>
      </div>
    </div>
   
    <div className="overflow-x-auto">
      <table className='table table-xs'>
        <thead>
          <tr>
            <td>Event ID</td>
            <td>Event Name</td>
            <td>Event Max Count</td>
            <td>Event Min Count</td>
            <td>Start Date</td>
            <td>Principle Coordinator</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {eventsData.map((row) => (
            <tr key={row.event_id}>
              <td>{row.event_id}</td>
              <td>{row.event_name}</td>
              <td>{row.event_maxcount}</td>
              <td>{row.event_mincount}</td>
              <td>{row.start_date}</td>
              <td>{row.principle_coordinator}</td>
              <td>{row.event_status}</td>
              <td><button className="btn btn-neutral" onClick={()=>{handleEdit(row.event_id)}}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </>
  )
}

export default AdminEventsList