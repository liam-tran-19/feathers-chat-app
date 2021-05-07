import React, { useEffect, useRef, useState } from "react";
import "./Conversations.scss";
import ChatHeader from "./Header/Header";
import { useLocation } from "react-router";
import { IUserObj, IMessage, IMsg, IMsgData } from "../../../types/interfaces";
import axios from "axios";
import { app } from "../../socket";
import avatar from '../../../images/prodile.png'

const Conversation: React.FC<{}> = () => {
  let user: any = localStorage.getItem("user");
  let userId = JSON.parse(user).id;
  const [formValue, setFormValue] = useState<string>("");
  const [userData, setUserData] = useState<IUserObj>();
  const [stateData, setStateData] = useState<IUserObj>();
  const [allMsg, setAllMsg] = useState<Array<IMsgData>>();
  let { state } = useLocation();
  const dummy = useRef<HTMLSpanElement>(null);
  const id = [userId, state].sort();
  useEffect(() => {
    axios.get<IUserObj>(`/api/auth/user/id/${userId}`).then((response) => {
      console.log(response.data);
      setUserData(response.data);
    });
    axios.get<IUserObj>(`/api/auth/user/id/${state}`).then((response) => {
      console.log(response.data);
      setStateData(response.data);
    });
    showChat()
    app.service("chats").on("created", showChat);
  }, []);

  const showChat = async () => {
    await axios
      .post<any>("/api/chats/find-chat", { _id: `${id[0]}-${id[1]}` })
      .then((response) => {
        console.log(response.data);
        setAllMsg(response.data);
      });
  };

  const sendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    let message = {
      _id: `${id[0]}-${id[1]}`,
      sender: userId,
      text: formValue,
    };
    // add to database
    if (allMsg && allMsg.length > 0) {
      await axios.post<IMsg>("/api/chats/update", {
        _id: `${id[0]}-${id[1]}`,
        message,
      });
    } else {
      await axios.post<IMsgData>("/api/chats/new-chat", message);
    }

    //socket io
    await app.service("chats").create({
      idBoth: `${id[0]}-${id[1]}`,
      sender: userId,
      text: formValue,
    });
    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  function chatMessage(message: IMsg) {
    const { text, sender } = message;

    const messageClass = sender === userId ? "sent" : "received";

    return (
      <div className={`message ${messageClass}`}>
        <img className="profileImg" src={avatar} />
        <p className="messageText">{text}</p>
      </div>
    );
  }

  // function addMessage(message: IMessage) {
  //   const { text, sender, idBoth } = message;
  //   const messageClass = sender === userId ? "sent" : "received";
  //   console.log(`${id[0]}-${id[1]}`);
  //   if (idBoth == `${id[0]}-${id[1]}`) {
  //     (document.getElementById(
  //       "scrollable-div"
  //     ) as HTMLInputElement).innerHTML += `<div class="message ${messageClass}">
  //     <p class="messageText">${text}</p>
  //   </div>`;
  //   } else {
  //     return;
  //   }
  // }

  return (
    <>
      <main>
        <ChatHeader info={stateData} />
        <section className="chat">
          <main id="scrollable-div">
            {allMsg &&
              allMsg.length > 0 &&
              allMsg[0].messages.map((msg) => chatMessage(msg))}
            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className="chat__message">
            <input
              className="chat__message-input"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type message"
            />

            <button type="submit" disabled={!formValue}>
              🕊️
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Conversation;
