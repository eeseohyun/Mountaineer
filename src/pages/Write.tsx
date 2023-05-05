import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Write(){
  const [posts, setPosts] = useState({});
  const category = ["전체", "서울", "경기", "강원"];
  return(
   
  useEffect(() => {
    const getPosts = async () => {
      const q = query(
        collection(db, "club"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const newPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      }
    };
    getPosts();
  }, [category, setPosts]);
  )
}