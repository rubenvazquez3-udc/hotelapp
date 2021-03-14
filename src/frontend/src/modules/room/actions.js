import * as actionTypes from './actionTypes';
import backend from '../../backend';


const addRoomCompleted = authenticatedRoom => ({
    type : actionTypes.ADD_ROOM_COMPLETED,
    authenticatedRoom
  });
  
export const addRoom = (room, onSuccess, onErrors, reauthenticationCallback) => dispatch => 
        backend.roomService.addRoom(room, 
            authenticatedRoom => {
            dispatch(addRoomCompleted(authenticatedRoom));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
  );


const findRoomsCompleted = rooms => ({
  type: actionTypes.FIND_ROOMS_COMPLETED,
  rooms
});

export const findRooms = (hotelid, status, onSuccess, onErrors) => dispatch =>
    backend.roomService.findRooms(hotelid, status, rooms => {
        dispatch(findRoomsCompleted(rooms));
        onSuccess();
    },
    onErrors
    );

const findRoomByIdCompleted = room => ({
    type: actionTypes.FIND_ROOM_BY_ID_COMPLETED,
    room
});

export const findRoomById = ( hotelid, roomid, onSuccess, onErrors) => dispatch =>
    backend.roomService.findRoom(hotelid, roomid, room => {
        dispatch(findRoomByIdCompleted(room));
        onSuccess();
    },
    onErrors
    );

const updateRoomCompleted = room =>({
        type: actionTypes.UPDATE_ROOM_COMPLETED,
        room
    });
    
export const updateRoom = (room, onSuccess, onErrors) => dispatch => 
        backend.roomService.updateRoom(room,
            room => {
                dispatch(updateRoomCompleted(hotel));
                onSuccess();
            },
            onErrors);