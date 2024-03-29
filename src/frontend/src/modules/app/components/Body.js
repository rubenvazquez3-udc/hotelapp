import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {HotelDetails, AddHotel, UpdateHotel, UploadPhoto, AddPrice, UpdatePrice, PriceDetails} from '../../hotel';
import {AddRoom, FindRooms, RoomDetails, UpdateRoom} from '../../room';
import {AddReservation, FindReservationsHotel, FindReservationsUser, ReservationDetails, UpdateReservation,AssignRoom,FindAccount} from '../../reservation';
import { AddGuest, FindGuests } from '../../guest';
import {AddService,UpdateService,ServiceDetails} from "../../service";
import {AddProduct, UpdateProduct, ProductDetails} from "../../product";


const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const userRole = useSelector(users.selectors.getUserRole);
    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/hotels/hotel-details/:id"><HotelDetails/></Route>
                <Route exact path="/hotels/upload-photo"><UploadPhoto/></Route>
                <Route exact path='/hotels/hotel-details/:id/update'><UpdateHotel/></Route>
                <Route exact path='/hotels/prices'><AddPrice/></Route>
                <Route exact path='/hotel/prices/:id'><PriceDetails/></Route>
                <Route exact path='/prices/details/:id/update'><UpdatePrice/></Route>
                <Route exact path='/rooms'><FindRooms/></Route>
                <Route exact path='/rooms/room-details/:id'><RoomDetails/></Route>
                <Route exact path='/hotels/hotel-details/:id/add-rooms'><AddRoom/></Route>
                <Route exact path='/hotels/room-details/:id/update'><UpdateRoom/></Route>
                <Route exact path='/hotels/hotel-details/:id/reservations'><AddReservation/></Route>
                {userRole === 'USER' && <Route exact path='/reservations'><FindReservationsUser/></Route>}
                {userRole !== 'USER' && <Route exact path='/reservations'><FindReservationsHotel/></Route>}
                <Route exact path='/reservations/reservation-details/:id'><ReservationDetails/></Route>
                <Route exact path='/reservations/reservation-details/:id/update'><UpdateReservation/></Route>
                <Route exact path='/reservations/reservation-details/:id/assignRoom'><AssignRoom/></Route>
                <Route exact path='/reservations/reservation-details/:id/addGuest'><AddGuest/></Route>
                <Route exact path='/reservations/reservation-details/:id/account'><FindAccount/></Route>
                <Route exact path='/guests'><FindGuests/></Route>
                <Route exact path='/services/details/:id'><ServiceDetails/></Route>
                <Route exact path='/services/add'><AddService/></Route>
                <Route exact path='/services/details/:id/update'><UpdateService/></Route>
                <Route exact path='/products/details/:id'><ProductDetails/></Route>
                <Route exact path='/products/add'><AddProduct/></Route>
                <Route exact path='/products/details/:id/update'><UpdateProduct/></Route>
                {loggedIn && <Route exact path="/users/update-profile"><UpdateProfile/></Route>}
                {loggedIn && <Route exact path="/users/change-password"><ChangePassword/></Route>}
                {loggedIn && <Route exact path="/users/logout"><Logout/></Route>}
                {!loggedIn && <Route exact path="/users/login"><Login/></Route>}
                {!loggedIn && <Route exact path="/users/signup"><SignUp/></Route>}
                {userRole === "ADMIN" && <Route exact path="/users/signup"><SignUp/></Route>}
                {userRole === "MANAGER" && <Route exact path="/users/signup"><SignUp/></Route>}
                {loggedIn && <Route exact path="/hotels"><AddHotel/></Route>}
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;
