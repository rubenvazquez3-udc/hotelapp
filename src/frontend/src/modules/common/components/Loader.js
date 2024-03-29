import React from 'react';
import PropTypes from 'prop-types';

import './Loader.css';

const Loader = ({loading}) => loading && (
    <div id="floatingCirclesG">
        <div className="f_circleG" id="frotateG_01"/>
        <div className="f_circleG" id="frotateG_02"/>
        <div className="f_circleG" id="frotateG_03"/>
        <div className="f_circleG" id="frotateG_04"/>
        <div className="f_circleG" id="frotateG_05"/>
        <div className="f_circleG" id="frotateG_07"/>
        <div className="f_circleG" id="frotateG_08"/>
    </div>
);

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loader;
