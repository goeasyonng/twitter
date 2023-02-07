import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dbFirestore } from "../fbase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Do you want to delete this?");
    if (ok) {
      await deleteDoc(doc(dbFirestore, "tweets", `${tweetObj.id}`));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // 트위터 데이터 업데이트
    const TweetTextRef = doc(dbFirestore, "tweets", `${tweetObj.id}`);

    console.log(tweetObj);

    await updateDoc(TweetTextRef, {
      text: newTweet,
      createAt: Date.now(),
      createdId: tweetObj.createdId,
    });

    setEditing(false);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="tweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Tweet" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <div class="tweet__actions">
                <button onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
