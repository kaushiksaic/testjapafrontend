import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const UserEventsList = () => {

    const [eventsData,setEventsData] = useState([]);
    const [error,setError] = useState("");
    const navigate = useNavigate();

   
  useEffect(() => {
    const handleEventsList = async () => {
        try {
            const res = await axios.get(BASE_URL + '/events/user',{withCredentials:true})
            if(res.data) {
              setEventsData(res.data.events);
            }

        } catch (err) {
            setError(err?.response?.data?.error || "Something went Wrong");
      console.error(err);
        }
    }
    handleEventsList();
  },[]);


  const handleRegisterEvent = async (eventId) => {
    try {
        const res = await axios.post(BASE_URL + '/event/register',{eventId},{withCredentials:true})
        if(res.status === 200) {
            alert('Registration Successful')
            setEventsData(prevEvents => prevEvents.map(event => event.event_id === eventId ? {...event,registration_status: 'active'} : event))
        } else {
            alert('Failed to register for the event')
        }

    } catch (err) {
        setError(err?.response?.data?.error || "Something went Wrong");
      console.error(err);
    }
  }

  const handleGoToDashboard = (eventId) => {
    navigate(`/dashboard/${eventId}`);
  };



  
  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsData.length > 0 ? (
          eventsData.map((event) => (
            <div className="card bg-base-100 w-96 shadow-xl" key={event.event_id}>
              <div className="card-body items-center text-center">
                <img style={{width:50,height:50}} src={event.event_icon} />
                <h2 className="card-title">{event.event_name}</h2>
                <span>Start Date: <strong>{event.start_date}</strong></span>
                <span>End Date: <strong>{event.end_date}</strong></span>
                <p>Min Count: {event.event_mincount}</p>
                <p>Coordinator: {event.principle_coordinator}</p>
                {event.registration_status === 'not_registered' && (<div className="card-actions">
                  <button className="btn btn-primary" disabled={event.registration_status === 'active'} onClick={() => handleRegisterEvent(event.event_id)}>Register</button>
                  <button className='btn btn-primary' disabled={event.registration_status !== 'active'} onClick={() => handleGoToDashboard(event.event_id)}>Go to Dashboard</button>
                </div>)}

                {event.registration_status === 'active' && (
                  <div className="card-actions">
                  <button className='btn btn-primary' onClick={() => handleGoToDashboard(event.event_id)}>Go to Dashboard</button>
                </div>
                )} 
                
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );

}

export default UserEventsList