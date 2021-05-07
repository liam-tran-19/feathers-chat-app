import React, { useEffect, useState } from "react";
import "./Post.scss";
import profilePic from "../../images/prodile.png";
import { Avatar } from "@material-ui/core";
import { IAllPosts, IPosts, IUserObj } from "../../types/interfaces";
import axios from "axios";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
} from "@material-ui/icons";
import {
  deleteTweetActions,
  updatePost,
} from "../../redux/actions/statusActions";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { isThisTypeNode } from "typescript";

const Post: React.FC<IPosts> = ({ key, post }) => {
  const [poster, setPoster] = useState<IUserObj>();
  const [handledLike, setHandledLike] = useState<boolean>(false);
  const [contentComment, setContentComment] = useState<string>();
  const [contentPost, setContentPost] = useState<IAllPosts>();

  const { user } = useSelector((state: RootStore) => state.auth);
  console.log(post);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/auth/user/id/${post.idPoster}`).then((res) => {
        const person = res.data;
        setPoster(person);
      });
      await axios.get(`api/status/post/id/${post._id}`).then((res) => {
        const post = res.data;
        setContentPost(post);
        let checkLike = post.idLiker.indexOf(user.id) > -1 ? true : false;
        setHandledLike(checkLike);
      });
    };
    fetchData();
  }, [handledLike, contentComment]);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updatePost(post._id, null, contentComment, user.id, user.username)
    );
    setContentComment("");
  };

  const handleLike = () => {
    console.log("object");
    setHandledLike(!handledLike);
    if (!handledLike) {
      dispatch(
        updatePost(post._id, user.id, contentComment, null, user.username)
      );
    } else {
      dispatch(
        deleteTweetActions(
          post._id,
          user.id,
          contentComment,
          null,
          user.username
        )
      );
    }
    console.log(handledLike);
  };

  console.log(user);
  // console.log(checkLike);
  console.log(handledLike);
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={profilePic} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {/* {displayName}{" "} */}
              <span className="post__headerSpecial">
                {poster && poster.username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post.postedDetails}</p>
          </div>
        </div>

        <div className="post__footer">
          <div onClick={handleLike} className="post__footer__like">
            {contentPost?.idLiker.length}
            {!handledLike ? (
              <FavoriteBorder fontSize="small" />
            ) : (
              <Favorite fontSize="small" />
            )}
          </div>
        </div>
        <div>
          {contentPost &&
            contentPost.comments.map((e) => {
              return (
                <div className="post__content">
                  <div className="post__content__user">
                    <img src={profilePic} />
                  </div>
                  <div className="post__content__details">
                    <b>{e.nameCommenter}</b>
                    <p>{e.contentComment}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="post__comment__type">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              value={contentComment}
              placeholder="comment"
              onChange={(e) => setContentComment(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
