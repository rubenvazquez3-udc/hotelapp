import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import users from '../../users';

const Header = () => {

    const userName = useSelector(users.selectors.getUserName);

    const user = useSelector(users.selectors.getUserRole);
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light border">
            <Link className="navbar-brand" to="/"><img src={process.env.PUBLIC_URL + './logo192.png'} alt='HOTEL App' /></Link>
            <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">
                </ul>

                {user === "ADMIN" ?
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users/signup">
                                <FormattedMessage id="project.users.Admin.title" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/hotels">
                                <FormattedMessage id="project.hotels.addHotel" />
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="dropdown-toggle nav-link" href="/" data-toggle="dropdown">
                                <span className="fas fa-user"/>&nbsp;
                                    {userName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item" to="/users/update-profile">
                                    <FormattedMessage id="project.users.UpdateProfile.title" />
                                </Link>
                                <Link className="dropdown-item" to="/users/change-password">
                                    <FormattedMessage id="project.users.ChangePassword.title" />
                                </Link>
                                <div className="dropdown-divider"/>
                                <Link className="dropdown-item" to="/users/logout">
                                    <FormattedMessage id="project.app.Header.logout" />
                                </Link>
                            </div>
                        </li>
                    </ul>
                    : user === "MANAGER" ?
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/hotels/prices">
                                    <FormattedMessage id="project.hotels.AddPrice.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products/add">
                                    <FormattedMessage id="project.product.AddProduct.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services/add">
                                    <FormattedMessage id="project.service.AddService.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/hotels/upload-photo">
                                    <FormattedMessage id="project.hotels.UploadPhoto.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/guests">
                                    <FormattedMessage id="project.guest.FindGuest.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservations">
                                    <FormattedMessage id="project.reservations.FindReservations.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/rooms">
                                    <FormattedMessage id="project.room.FindRoom.title" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/signup">
                                    <FormattedMessage id="project.users.Manager.title" />
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle nav-link" href="/" data-toggle="dropdown">
                                    <span className="fas fa-user"/>&nbsp;
                                    {userName}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="/users/update-profile">
                                        <FormattedMessage id="project.users.UpdateProfile.title" />
                                    </Link>
                                    <Link className="dropdown-item" to="/users/change-password">
                                        <FormattedMessage id="project.users.ChangePassword.title" />
                                    </Link>
                                    <div className="dropdown-divider"/>
                                    <Link className="dropdown-item" to="/users/logout">
                                        <FormattedMessage id="project.app.Header.logout" />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        : user === "HOTEL" ?
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/guests">
                                        <FormattedMessage id="project.guest.FindGuest.title" />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reservations">
                                        <FormattedMessage id="project.reservations.FindReservations.title" />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/rooms">
                                        <FormattedMessage id="project.room.FindRoom.title" />
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle nav-link" href="/" data-toggle="dropdown">
                                        <span className="fas fa-user"/>&nbsp;
                                    {userName}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="/users/update-profile">
                                            <FormattedMessage id="project.users.UpdateProfile.title" />
                                        </Link>
                                        <Link className="dropdown-item" to="/users/change-password">
                                            <FormattedMessage id="project.users.ChangePassword.title" />
                                        </Link>
                                        <div className="dropdown-divider"/>
                                        <Link className="dropdown-item" to="/users/logout">
                                            <FormattedMessage id="project.app.Header.logout" />
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                            : userName ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/reservations">
                                            <FormattedMessage id="project.reservations.FindReservations.title" />
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="dropdown-toggle nav-link" href="/" data-toggle="dropdown">
                                            <span className="fas fa-user"/>&nbsp;
                                    {userName}
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link className="dropdown-item" to="/users/update-profile">
                                                <FormattedMessage id="project.users.UpdateProfile.title" />
                                            </Link>
                                            <Link className="dropdown-item" to="/users/change-password">
                                                <FormattedMessage id="project.users.ChangePassword.title" />
                                            </Link>
                                            <div className="dropdown-divider"/>
                                            <Link className="dropdown-item" to="/users/logout">
                                                <FormattedMessage id="project.app.Header.logout" />
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/users/login">
                                            <FormattedMessage id="project.users.Login.title" />
                                        </Link>
                                    </li>
                                </ul>
                }
            </div>
        </nav>

    );

};

export default Header;
