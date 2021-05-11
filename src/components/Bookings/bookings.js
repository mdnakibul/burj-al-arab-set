import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
const Bookings = () => {

    const [bookings,setBookings] = useState([]);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    useEffect(()=>{
        fetch(`http://localhost:5000/bookings?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])

    return (
        <div>
            <h1>You have : {bookings.length} Bookings</h1>
            {
                bookings.map(booking => <li> Name : {booking.name} From : {booking.checkIn} To : {booking.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;