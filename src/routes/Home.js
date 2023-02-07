import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import { dbFirestore } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    // db에 데이터 추가
    await addDoc(collection(dbFirestore, "tweets"), {
      text: tweet,
      createAt: Date.now(),
      createdId: userObj.uid,
    });
  };

  // 입력값
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };

  // db로 부터 데이터 불러오기
  useEffect(() => {
    const q = query(
      collection(dbFirestore, "tweets"),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      setTweets(tweetArr);
    });
  }, []);

  console.log(tweets);
  console.log(userObj);

  return (
    <div className="home_container">
      <form onSubmit={onSubmit} className="homeForm">
        <div className="homeInput__container">
          <input
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="당신의 마음을 표현해 주세요 :)"
            className="homeInput__input"
          />
          <input type="submit" value="tweet" className="homeForm_btn" />
          {/*submit : 입력받은 데이터 전송하기 - 자동으로 데이터 전송 가능한 버튼이 생기고, 클릭 시 지정된 url 서버 페이지로 전송된다.*/}
        </div>
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.createdId === userObj.uid}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
