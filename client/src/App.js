import React, { useState, useEffect, useRef, createRef } from 'react';
import logo from './logo.svg';
import './App.css';

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function App() {
  const [hotels, setHotels] = useState([])
  const [showDetails, setShowDetails] = useState(false)
  const [hotelDetails, setHotelDetails] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [reservations, setReservations] = useState([])
  const [activePath, setActivePath] = useState(null)

  const inputRef = []
  inputRef[0] = useRef()
  inputRef[1] = useRef()
  inputRef[2] = useRef()
  inputRef[3] = useRef()
  inputRef[4] = useRef()
  inputRef[5] = useRef()
  inputRef[6] = useRef()
  inputRef[7] = useRef()
  inputRef[8] = useRef()
  useEffect(() => {
    initApp()
    handleListHotel()
    listReservations()
    const route = window.location.href.split('/')
    if (route[3])
      setActivePath(route[3])
  }, [])
  const handleBook = (hotel) => {
    //console.log(inputRef)
    postData('http://localhost:9000/reservation/add', {
      hotelName: hotelDetails.name,
      checkInDate: inputRef[4].current.value,
      checkOutDate: inputRef[5].current.value,
      name: inputRef[0].current.value,
      surname: inputRef[1].current.value,
      phoneNumber: inputRef[2].current.value,
      email: inputRef[3].current.value,
    }).then(res => {
      console.log(res)
    })
  }

  const approveReservation = (code) => {
    postData('http://localhost:9000/reservation/approve', {
      reservationCode: code
    }).then(res => {
      console.log(res)
    })
  }

  const handleListHotel = () => {
    postData('http://localhost:9000/hotel/list', {
      name: "Kamil"
    }).then(res => {
      setHotels(res.hotels)
      console.log(res)
    })
  }

  const listReservations = () => {
    postData('http://localhost:9000/reservation/list', {
      name: "Kamil"
    }).then(res => {
      setReservations(res.reservations)
    })
  }

  const handleDetails = (hotel) => {
    setShowDetails(true)
    setHotelDetails(hotel)
  }
  const mHotels = hotels.map(hotel => {
    return (
      <HotelCard
        key={hotel._id}
        imageUrl={hotel.images.picture_url}
        space={hotel.space.slice(0, 120)}
        onClick={() => handleDetails(hotel)}
      />
    )
  })

  const handleApprove = () => {
    console.log("hello")
  }
  const mReservations = reservations.map(reserv => {
    return (
      <ReservationCard
        reservationCode={reserv.reservationCode}
        checkInDate={reserv.checkInDate}
        checkOutDate={reserv.checkOutDate}
        name={reserv.name}
        surname={reserv.surname}
        phoneNumber={reserv.phoneNumber}
        email={reserv.email}
        hotelName={reserv.hotelName}
        createdAt={reserv.createdAt}
        approved={reserv.approved}
        onClick={() => approveReservation(reserv.reservationCode)}
      />
    )
  })

  const handleLogin = () => {
    postData('http://localhost:9000/auth/login', {
      username: inputRef[6].current.value,
      password: inputRef[7].current.value,
    }).then(res => {
      console.log(res)
      localStorage.setItem('accessToken', res.accessToken)
      if (res.success)
        setLoggedIn(true)
    })
  }

  const initApp = () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      postData('http://localhost:9000/auth/init', {
        token: token
      }).then(res => {
        console.log(res)
        if (res.success)
          setLoggedIn(true)
      })
    }
  }

  const performSearch = () => {
    console.log(inputRef[8].current.value)
    postData('http://localhost:9000/hotel/search', {
      searchTerm: inputRef[8].current.value
    }).then(res => {
      if (res.success)
        console.log(res)
        setHotels(res.hotels)
    })
  }

  const renderHome = () => {
    return (
      <>
        {
          showDetails ?
            <div style={{
              width: 300,
              height: 300,
              backgroundColor: 'lightgray',
              borderRadius: 10,
              zIndex: 2,
              alignItems: 'center',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: 30 }}>
                <input ref={inputRef[0]} style={{ marginTop: 30, width: '80%' }} type='text' placeholder="name" />
                <input ref={inputRef[1]} style={{ marginTop: 10, width: '80%' }} type='text' placeholder="surname" />
                <input ref={inputRef[2]} style={{ marginTop: 10, width: '80%' }} type='text' placeholder="phone number" />
                <input ref={inputRef[3]} style={{ marginTop: 10, width: '80%' }} type='text' placeholder="email" />
                <input ref={inputRef[4]} style={{ marginTop: 10, width: '80%' }} type='date' placeholder="checkin date" />
                <input ref={inputRef[5]} style={{ marginTop: 10, width: '80%' }} type='date' placeholder="checkout date" />
              </div>
              <button onClick={handleBook}>book</button>
              <button onClick={() => setShowDetails(false)} >close</button>
            </div> : null
        }
        <input ref={inputRef[8]} style={{ marginTop: 50, width: '30%' }} type='text' placeholder="search hotel" />
        <button onClick={performSearch}>search</button>
        {mHotels}
      </>
    )
  }

  const renderAdmin = () => {
    return (
      <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
      {
        loggedIn ?
        <div style={{width: '100%'}}>
          {mReservations}
        </div>
        :
        <div style={{
          width: 300,
          height: 300,
          backgroundColor: 'lightgray',
          borderRadius: 10,
          position: 'absolute',
          zIndex: 2,
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: 30 }}>
            <input ref={inputRef[6]} style={{ marginTop: 30, width: '80%' }} type='text' placeholder="name" />
            <input ref={inputRef[7]} style={{ marginTop: 10, width: '80%' }} type='password' placeholder="password" />
          </div>
          <button onClick={handleLogin}>login</button>
          <button onClick={() => setShowDetails(false)} >close</button>
        </div>
      }
      </div>
    )
  }

  return (
    <div className="App">
      {
        activePath === 'admin' ?
        renderAdmin() : renderHome()
      }
    </div>
  );
}

const HotelCard = ({
  imageUrl,
  space,
  onClick
}) => {
  return (
    <>
      <div style={{ border: '1px lightgray solid', width: '40%', marginTop: 30, display: 'flex', flexDirection: 'row', borderRadius: 3, padding: 10 }}>
        <div>
          <img src={imageUrl} style={{ borderRadius: 5, width: 100, height: 100, marginRight: 20 }} />
        </div>
        <div>
          {space}
        </div>
        <button onClick={onClick}>details</button>
      </div>
    </>
  )
}

const ReservationCard = ({
  reservationCode,
  checkInDate,
  checkOutDate,
  name,
  surname,
  phoneNumber,
  email,
  hotelName,
  createdAt,
  approved,
  onClick
}) => {
  let appr = "not approved"
  if(approved)
    appr = "approved"
  console.log(approved)
  return (
    <>
      <div style={{ border: '1px lightgray solid', width: '40%', marginTop: 30, display: 'flex', borderRadius: 3, padding: 10, flexDirection: 'column' }}>
        <div>
          <p>reservationCode: {reservationCode}</p>
          <p>checkInDate: {checkInDate}</p>
          <p>checkOutDate: {checkOutDate}</p>
          <p>name: {name}</p>
          <p>surname: {surname}</p>
          <p>phoneNumber: {phoneNumber}</p>
          <p>email: {email}</p>
          <p>hotelName: {hotelName}</p>
          <p>approved: {appr}</p>
          <p>createdAt: {createdAt}</p>
        </div>
        <div>
          <button onClick={onClick}>Approve</button>
        </div>
      </div>
    </>
  )
}
export default App;
