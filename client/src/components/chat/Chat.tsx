import React, { useState, useEffect } from "react";
import { ITarget, IUserObj } from "../../types/interfaces";
import AppNav from "../AppNav";
import "./Chat.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link, useHistory } from "react-router-dom";
import newMessage from "../../images/Write Message.png";
import profilePicture from "../../images/prodile.png";
// import { app } from "../socket";
const Chat: React.FC<{}> = () => {
  const [searchName, setSearchName] = useState("");
  const [listFriends, setListFriends] = useState<Array<IUserObj>>();
  const [newMsg, setNewMsg] = useState<boolean>(false);
  // const messagesRef = firestore
  //   .collection("chats")
  //   .orderBy("lastMessage", "desc");
  // const [allMessages] = useCollectionData(messagesRef);
  // console.log(allMessages);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/auth/user/findAll")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListFriends(data);
      });
  }, []);

  const user: any = localStorage.getItem("user");

  const userId = JSON.parse(user).id;
  console.log(userId);

  // const conversations =
  //   allMessages &&
  //   allMessages.map((message) => {
  //     if (message.users.indexOf(userId) > -1) {
  //       const index = message.users.findIndex((id: number) => id != userId);
  //       const id = message.users[index];
  //       console.log(id);
  //       return (
  //         <ListCard idFriend={id} idTexter={userId} searchName={searchName} />
  //       );
  //     }
  //   });
  const handleMessage = (resName: number) => {
    console.log(resName);
    localStorage.setItem("chat-friend", JSON.stringify(resName));
    console.log(resName);
    history.push("/conversation", resName);
  };
  const createConversation =
    listFriends &&
    listFriends.map((usr) => {
      if (usr._id != userId) {
        return (
          <div className="inbox" onClick={() => handleMessage(usr._id)}>
            <div>
              <img src={profilePicture} className="inbox__user-pic" />
            </div>
            <h3>{usr.username}</h3>
          </div>
        );
      }
    });

  return (
    <div>
      <AppNav />
      <main>
        {/* <Header /> */}
        <section className="messages">
          <div className="messages__header">
            <h2 className="messages__header__title">Chat</h2>
            {!newMsg ? (
              <div onClick={() => setNewMsg(true)}>
                <img src={newMessage} alt="newMessage" />
              </div>
            ) : (
              <div onClick={() => setNewMsg(false)}>Cancel</div>
            )}
          </div>
          <div className="messages__search">
            <input
              className="messages__search-input"
              placeholder="Search"
              value={searchName}
              onChange={(e: ITarget) => setSearchName(e.target.value)}
            />
          </div>
          <div className="messages__search-messages-div">
            <p className="messages__search-messages">
              {!newMsg ? "Messages" : "Create New Message"}
            </p>
          </div>
          <div></div>
          {createConversation}
        </section>
      </main>
    </div>
  );
};

export default Chat;
