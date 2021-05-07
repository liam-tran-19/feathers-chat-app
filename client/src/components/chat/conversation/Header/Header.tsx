import React from "react";
import { Link, useHistory } from "react-router-dom";
import Packages from "../../../../../images/packages.png";
import userAvatar from "../../../../../images/profile-photo.svg";
import back from "../../../../images/GoBack.png";

import "./Header.scss";
import { IUserObj } from "../../../../types/interfaces";

const ChatHeader = ({ info }: any) => {
  let history = useHistory();

  return (
    <div className="Conversation-header">
      <div className="Conversation-header__items">
        <img
          onClick={() => history.goBack()}
          src={back}
          className="Conversation-header__items-back"
        />
        <h4>{info && info.username}</h4>
      </div>
    </div>
  );
};

export default ChatHeader;
