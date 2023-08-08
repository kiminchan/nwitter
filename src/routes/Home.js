import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }
            // 데이터 베이스에 담긴 정보를 볼 수 있다.
            // querysnapshot 
            //console.log(doc.data());

            // react는 함수이전의 값을 사용할 수 있다. 
            setNweets(prev => [nweetObj, ...prev]);
        });

    };

    useEffect(() => {
        getNweets();
    }, []);


    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now()
            })
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document.", error);
        }

        setNweet('');
    }

    const onChange = (event) => {
        // Event 안에 있는 target의 밸류 
        const { target: { value }, } = event;
        setNweet(value);

    }

    console.log(nweets);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) =>
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div >

    );

};
export default Home;