import * as actionTypes from './actionTypes';
import backend from '../../backend';


export const getHotelsCompleted = hotelResult => ({
    type: actionTypes.GET_HOTELS_COMPLETED,
    hotelResult
});

export const getHotels = () => dispatch => {

    backend.hotelService.getHotels(hotelResult =>
        dispatch(getHotelsCompleted(hotelResult)));
};

const findHotelByIdCompleted = hotel => ({
    type: actionTypes.GET_HOTEL_BY_ID_COMPLETED,
    hotel
});

export const findHotelById = id => dispatch => {
    backend.hotelService.getHotelsById(id, hotel =>
        dispatch(findHotelByIdCompleted(hotel)));
};


const addHotelCompleted = authenticatedHotel => ({
    type: actionTypes.ADD_HOTEL_COMPLETED,
    authenticatedHotel
});

export const addHotel = (hotel, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.hotelService.addHotel(hotel,
        authenticatedHotel => {
            dispatch(addHotelCompleted(authenticatedHotel));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

const updateHotelCompleted = hotel => ({
    type: actionTypes.UPDATE_HOTEL_COMPLETED,
    hotel
});

export const updateHotel = (hotel, onSuccess, onErrors) => dispatch =>
    backend.hotelService.updateHotel(hotel,
        hotel => {
            dispatch(updateHotelCompleted(hotel));
            onSuccess();
        },
        onErrors);

const removeHotelCompleted = hotelid => ({
    type: actionTypes.REMOVE_HOTEL_COMPLETED,
    hotelid
});

export const removeHotel = (hotel,hotelid, onSuccess, onErrors) => dispatch =>
    backend.hotelService.removeHotel(hotel,() =>{
        dispatch(removeHotelCompleted(hotelid));
        onSuccess();
    },           
    onErrors);

