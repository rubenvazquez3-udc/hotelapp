import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from "../selectors";

import users from "../../users";


const UploadPhoto = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(users.selectors.getUser);
    const hotels = useSelector(selectors.getHotels);

    const [backendErrors, setBackendErrors] = useState(null);

    let form;

    const hotel1 = hotels.hotelResult.items.filter(hotel => hotel.address === user.address);

    let file1 = null;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const fd = new FormData();
            fd.append('file',file1,file1.name);

            dispatch(actions.uploadPhoto(hotel1[0].id, fd,
                () => history.push(`/hotels/hotel-details/${hotel1[0].id}`),
                errors => setBackendErrors(errors)
            ));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const viewData = event => {
        event.preventDefault();
        file1 = event.target.files[0];
    }


    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.hotels.UploadPhoto.title" />
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>

                        <div className="form-group row">
                            <label htmlFor="room" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.Photo" />
                            </label>
                            <div className="col-md-4">
                                <input type="file" id="file" className="form-control"
                                       onChange={ e => viewData(e)}
                                       autoFocus
                                       required />
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required' />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.save" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default UploadPhoto;