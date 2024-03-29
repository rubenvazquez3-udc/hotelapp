
import * as actionTypes from './actionTypes';
import backend from '../../backend';

const addReservationCompleted = reservation => ({
    type: actionTypes.ADD_RESERVATION_COMPLETED,
    reservation
});

export const addReservation = (reservation, onSuccess, onErrors) => dispatch =>
    backend.reservationService.addReservation(reservation, reservation => {
        dispatch(addReservationCompleted(reservation));
        onSuccess();
    },
    onErrors
    );

const findReservationsCompleted = reservations => ({
    type: actionTypes.FIND_RESERVATIONS_HOTEL_COMPLETED,
    reservations
});

export const clearReservations = () => ({
    type: actionTypes.CLEAR_RESERVATIONS_COMPLETED
});

export const previousFindReservationsResultPage = criteria => 
    findReservations({...criteria, page: criteria.page-1});

export const nextFindReservationsResultPage = criteria =>
    findReservations({...criteria, page: criteria.page+1});

export const findReservations = criteria => dispatch =>{

    dispatch(clearReservations());

    backend.reservationService.findReservations(criteria, reservations => {
        dispatch(findReservationsCompleted({criteria,reservations}));
    });
}
   

const findReservationByIdCompleted = reservation => ({
    type: actionTypes.FIND_RESERVATION_BY_ID_COMPLETED,
    reservation
});

export const findReservationById = (reservationid) => dispatch =>
    backend.reservationService.findReservationById(reservationid, reservation =>{
        dispatch(findReservationByIdCompleted(reservation));
    });

const updateReservationCompleted = reservation => ({
    type: actionTypes.UPDATE_RESERVATION_COMPLETED,
    reservation
});

export const updateReservation = (reservation, onSuccess, onErrors) => dispatch =>
    backend.reservationService.updateReservation(reservation, reservation => {
        dispatch(updateReservationCompleted(reservation));
        onSuccess();
    }, onErrors);


const removeReservationCompleted = id =>({
    type: actionTypes.REMOVE_RESERVATION_COMPLETED,
    id
});

export const removeReservation = (reservation, onSuccess, onErrors) => dispatch => 
    backend.reservationService.removeReservation(reservation,() =>{
        dispatch(removeReservationCompleted(reservation.id));
        onSuccess();
    }, onErrors);

    
const findAvailableRoomsCompleted = rooms => ({
    type: actionTypes.FIND_AVAILABLE_ROOMS_COMPLETED,
    rooms
});

export const findAvailableRooms = (hotelid, type) => dispatch => {

        backend.reservationService.findAvailableRooms(hotelid,type, 
            roomsfound => dispatch(findAvailableRoomsCompleted(roomsfound)));
    }


const assignRoomCompleted = () => ({
    type: actionTypes.ASSIGN_ROOM_COMPLETED
});

export const assignRoom = (roomreservation,onSuccess, onErrors) => dispatch =>
    backend.reservationService.assignRoom(roomreservation.reservation.id, roomreservation, reservation =>{
        dispatch(assignRoomCompleted(reservation));
        onSuccess();
    }, onErrors);


const findAccountCompleted = account =>({
    type: actionTypes.FIND_ACCOUNT_COMPLETED,
    account
});

export const findAccount = (reservationid) => dispatch =>
    backend.reservationService.findAccount(reservationid, account =>{
        dispatch(findAccountCompleted(account));
    });

const addToAccountCompleted = account => ({
    type: actionTypes.ADD_TO_ACCOUNT_COMPLETED,
    account
});

export const AddToAccount = (reservationid, params, onSuccess, onErrors) => dispatch =>
    backend.reservationService.addToAccount(reservationid,params, account => {
        dispatch(addToAccountCompleted(account));
        onSuccess();
        }, onErrors);

