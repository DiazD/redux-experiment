import React from "react";
import "./Users.css";
import { useSelector, useDispatch } from "react-redux";

// components
import Section from "../../components/Section";

// redux
import users from "../../store/users";

const UsersList = () => {
  const usersList = useSelector(users.selectors.getUsersArraySelector);
  const dispatch = useDispatch();

  const removeUser = (id) => () =>
    dispatch(users.actions.removeUser({ users: id }));

  // NOTE: simplest way to render it but not most optimal
  return (
    <div className="scrollable-container">
      {usersList.map((user) => (
        <Section key={user.id} header={`${user.first_name} Details`}>
          <div className="detail-wrapper">
            <div>
              <div className="detail-container">
                <span className="detail-header">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="detail-container">
                <span className="detail-header">Ip Address:</span>
                <span>{user.ip_address}</span>
              </div>
            </div>
            <div>
              <div className="detail-actions-container">
                <button onClick={removeUser(user.id)}>delete</button>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
};

export default UsersList;
