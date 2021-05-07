import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useHistory } from 'react-router';
export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const logoutUser = () => {
    dispatch(logout())
    history.push('/login')
  }
  return (
    <Fragment>
      <NavLink onClick={logoutUser} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default (Logout);
