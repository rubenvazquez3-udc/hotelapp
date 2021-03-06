import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import * as selectors from "../selectors";
import * as actions from '../actions';
import users from '../../users';

import { BackLink, ConfirmDialog } from '../../common';
import { FormattedMessage } from 'react-intl';


const HotelDetails = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const hotel = useSelector(selectors.getHotel);
    const { id } = useParams();
    const user = useSelector(users.selectors.getUser);

    let adminValues = null;

    const handleSubmit = event => {
        event.preventDefault();

        dispatch(actions.removeHotel(hotel,hotel.id,() => console.log(hotel.address), error => console.log(error)));
        history.push('/')
    }


    useEffect(() => {
        const hotelid = Number(id);

        if (!Number.isNaN(id)) {
            dispatch(actions.findHotelById(hotelid));
        }
    }, [id, dispatch]);

    if (!hotel) {
        return null;
    }

    if (user.role === 'ADMIN') {
        adminValues = (
            <div className="card-footer">
                <div className="form-group row">
                    <ul id='admin'>
                        <li id='managerbutton'>
                            <Link className="nav-link" to={`/hotels/hotel-details/${hotel.id}/update`}>
                                <span className="fas fa-edit fa-2x"></span>
                            </Link>
                        </li>
                        <li id='managerbutton'>
                            <ConfirmDialog id='removeHotel' icon='eraser fa-3x' headerTitle='Remove Hotel'
                                bodyTitle='Are you sure that you want to remove it?' onConfirm={e => handleSubmit(e)} />
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else if (user.role === 'MANAGER' && hotel.address === user.address) {
        adminValues = (
                        <div>
                            <Link className="nav-link" to={`/hotels/hotel-details/${hotel.id}/update`}>
                                <FormattedMessage id="project.hotels.UpdateHotel.title" />
                            </Link>
                            <Link className="nav-link" to={`/hotels/hotel-details/${hotel.id}/add-rooms`} >
                                <FormattedMessage id="project.hotels.AddRoom.title" />
                            </Link>
                        </div>
            
        )
    } else if (user.role === 'USER') {
        adminValues =
            <Link className="nav-link" to={`/hotels/hotel-details/${hotel.id}/reservations`} >
                <FormattedMessage id="project.hotels.AddReservation.title" />
            </Link>
    } else if (user.role === 'HOTEL' && hotel.address === user.address) {
        adminValues = (
            <div>
                <Link className="nav-link" to={`/hotels/hotel-details/${hotel.id}/update`}>
                    <FormattedMessage id="project.hotels.UpdateHotel.title" />
                </Link>
            </div>
        )
        
    }

    return (
        <div>
            
            <div className="card">

                <div className="card-header">
                    <BackLink />  <h5 className="card-title text-center">{hotel.name}</h5>
                </div>

                <div className="card-body text-center">

                    <h6 className="card-subtitle"><FormattedMessage id="project.global.fields.address" /> : {hotel.address}</h6>
                    <br/>
                    <p className="card-text">  <FormattedMessage id="project.global.fields.hotelManager" /> : {hotel.manager}</p>

                    <p className="card-text"> <FormattedMessage id="project.global.fields.description" /> : {hotel.description}</p>

                    <p className="card-text"> <span className="fas fa-phone-square"/>  {hotel.phoneNumber}</p>
                </div>

                <div className="card-footer text-center">
                    {adminValues}
                </div>
                
            </div>

        </div>
    );
};


export default HotelDetails;