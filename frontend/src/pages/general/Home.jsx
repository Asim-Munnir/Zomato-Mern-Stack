import React, { useState } from 'react'
import '../../styles/reels.css'
import axios from "axios"
import ReelFeed from '../../components/ReelFeed'
import { useEffect } from 'react'

const Home = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/food/getFoodItems", { withCredentials: true })
      .then(response => {

        console.log(response.data.foodItems);

        setVideos(response.data.foodItems)
      })
      .catch(() => { /* noop: optionally handle error */ })
  }, [])

  function likeVideo(item) {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, likeCount: v.likeCount + 1 }
          : v
      )
    )
  }

  function saveVideo(item) {
    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? { ...v, savesCount: v.savesCount + 1 }
          : v
      )
    )
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  )
}

export default Home