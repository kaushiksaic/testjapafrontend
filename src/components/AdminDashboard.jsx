import axios from 'axios'
import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import { useSelector } from 'react-redux';

// const AdminDashboard = () => {

//  const [overviewData,setOverviewData] = useState([]);
//  const [totalSum,setTotalSum] = useState('');
// //  const { userid, usertype } = useSelector((store) => store.user);
// const user = JSON.parse(localStorage.getItem("user") || "null");
// const userid = user?.userid;
// const usertype = user?.usertype;

//  useEffect(() => {
//   const handleAdminFetch = async () => {
//     try {
//       const res =  await axios.get(BASE_URL + "/japa/overview",{headers: {
//         "x-userid": userid,
//         "x-usertype": usertype
//       },withCredentials: true})
//       // console.log("API Response :",res.data)
//       if(res.data) {
//         setOverviewData(res.data.overview);
//         setTotalSum(res.data.sum);
//       }
//     } catch(err) {
//      console.error(err);
//     }
//   }
//   handleAdminFetch();
 
//  },[])






//   return (
//     <>
//     <div className="card lg:card-side bg-base-100 shadow-xl mx-5 my-5">
//   <div className="card-body">
//     <h2 className="card-title">Event Users Overview</h2>

//     <div>
//       <label>Select Event</label>
//       <select className=''>
//         <option>Select Event</option>
//       </select>
//     </div>
//     <div className="overflow-x-auto">
//   <table className="table table-xs">
//     <thead>
//       <tr>
//         <th>UserID</th>
//         <th>Mobile Number</th>
//         <th>Name</th>
//         <th>City</th>
//         <th>Count</th>
//         <th>PIN Number</th>
//       </tr>
//     </thead>
//     <tbody>
//       {overviewData.map((row) => (
//         <tr key={row.userid}>
//           <td>{row.userid}</td>
//           <td>{row.mobilenum}</td>
//           <td>{row.name}</td>
//           <td>{row.city ? row.city : 'N/A'}</td>
//           <td>{row.count}</td>
//           <td>{row.pinnum}</td>
//         </tr>
//       ))}
//     </tbody>
    
//   </table>
// </div>
// <h4 className='font-bold text-3xl mt-2'>Total Count : {totalSum}</h4>
//   </div>
// </div>
//     </>
//   )
// }


const AdminDashboard = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [totalSum, setTotalSum] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userid = user?.userid;
  const usertype = user?.usertype;

  // 1. Fetch all events for the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(BASE_URL + '/listevents', {
          headers: {
            "x-userid": userid,
            "x-usertype": usertype
          },
          withCredentials: true
        });
        setEvents(res.data.events || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  // 2. Fetch overview for selected event
  useEffect(() => {
    if (!selectedEventId) return;

    const fetchOverview = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/japa/overview/${selectedEventId}`, {
          headers: {
            "x-userid": userid,
            "x-usertype": usertype
          },
          withCredentials: true
        });
        setOverviewData(res.data.overview || []);
        setTotalSum(res.data.sum || 0);
      } catch (err) {
        console.error('Failed to fetch overview:', err);
      }
    };

    fetchOverview();
  }, [selectedEventId]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl mx-5 my-5">
      <div className="card-body">
        <h2 className="card-title">Event Users Overview</h2>

        <div>
          <label className='font-semibold mb-1 block'>Select Event</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>

        {selectedEventId && (
          <>
            <div className="overflow-x-auto mt-4">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>UserID</th>
                    <th>Mobile Number</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Count</th>
                    <th>PIN Number</th>
                  </tr>
                </thead>
                <tbody>
                  {overviewData.map((row) => (
                    <tr key={row.userid}>
                      <td>{row.userid}</td>
                      <td>{row.mobilenum}</td>
                      <td>{row.name}</td>
                      <td>{row.city || 'N/A'}</td>
                      <td>{row.count}</td>
                      <td>{row.pinnum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="font-bold text-3xl mt-2">Total Count: {totalSum}</h4>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard