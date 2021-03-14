import React from 'react';
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import {RoomLink} from '../../common';

const Rooms = ({rooms}) => (

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.roomNumber'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.roomType'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.roomStatus'/>
                </th>
            </tr>
        </thead>
        
        <tbody>
            {rooms.map(room =>
                <tr key={room.id}>
                    <td><RoomLink id={room.id} name={room.numbe}/></td>
                    <td>{room.type.name}</td>
                    <td>{room.status}</td>
                </tr>
            )}
        </tbody>

    </table>
   
);

Rooms.propTypes = {
    rooms: PropTypes.array.isRequired
};

export default Rooms;