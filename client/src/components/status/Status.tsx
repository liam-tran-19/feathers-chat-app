import React, { useEffect, useState } from "react";
import AppNav from "../AppNav";
import { Avatar, Button } from "@material-ui/core";
import FlipMove from "react-flip-move";
import "./Status.scss";
import Post from "../post/Post";
import { Container } from "reactstrap";
import profilePic from "../../images/prodile.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { IAllPosts } from "../../types/interfaces";
import { getPosts } from "../../redux/actions/statusActions";
const Status: React.FC<{}> = () => {
  const [tweetMessage, setTweetMessage] = useState<string>();
  // const [allPosts, setAllPosts] = useState<Array<IAllPosts>>();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStore) => state.auth);
  const { posts } = useSelector((state: RootStore) => state.status);
  console.log(user);

  useEffect(() => {
    dispatch(getPosts());
    // setAllPosts(posts);
  }, [tweetMessage]);

  const sendTweet = () => {
    axios.post("/api/status/post", {
      _id: posts.length + 1,
      postedDetails: tweetMessage,
      idPoster: user.id,
    });
    setTweetMessage("");
    console.log("hello");
  };
  // console.log(allPosts);
  console.log(posts);

  return (
    <>
      <AppNav />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="feed">
          <div className="feed__header">
            <h2>Home</h2>
          </div>

          <div className="feed__tweetBox">
            <div className="feed__tweetBox__input">
              <Avatar src={profilePic} />
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTweetMessage(e.target.value)
                }
                value={tweetMessage}
                placeholder="Share your status with friends?"
                type="text"
              />
            </div>

            <Button onClick={sendTweet} className="feed__tweetBox__tweetButton">
              Tweet
            </Button>
          </div>
          <FlipMove>
            <div>{posts && posts.map((post) => <Post key={post._id} post={post} />)}</div>
          </FlipMove>
        </div>
      </Container>
    </>
  );
};

export default Status;
