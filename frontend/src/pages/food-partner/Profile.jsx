import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()

    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [videoLoading, setVideoLoading] = useState({})

    const getProfile = async () => {
        try {
            setLoading(true)

            const res = await axios.get(
                `http://localhost:3000/api/v1/food-partner/${id}`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setProfile(res.data.foodPartner)
                setVideos(res.data.foodPartner.foodItems || [])
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [id])


    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
                <p>Loading profile...</p>
            </div>
        )
    }

    return (
        <main className="profile-page">

            {/* HEADER */}
            <section className="profile-header">

                <div className="profile-meta">
                    <img
                        className="profile-avatar"
                        src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37"
                        alt="profile"
                    />

                    <div className="profile-info">
                        <h1 className="profile-business">
                            {profile?.name}
                        </h1>
                        <p className="profile-address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <div className="profile-stats">
                    <div>
                        <div className="profile-stat-value">
                            {videos.length}
                        </div>
                        <div className="profile-stat-label">Meals</div>
                    </div>

                    <div>
                        <div className="profile-stat-value">
                            {profile?.customersServed || 0}
                        </div>
                        <div className="profile-stat-label">Customer Serve</div>
                    </div>
                </div>

            </section>

            <hr className="profile-sep" />

            {/* VIDEO GRID */}
            <section className="profile-grid">
                {videos.map((v) => (
                    <div key={v._id} className="profile-grid-item">

                        {/* Loader */}
                        {!videoLoading[v._id] && (
                            <div className="video-loader"></div>
                        )}

                        <video
                            className="profile-grid-video"
                            src={v.video}
                            muted
                            loop
                            preload="metadata"
                            onLoadedData={() =>
                                setVideoLoading((prev) => ({
                                    ...prev,
                                    [v._id]: true
                                }))
                            }
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => {
                                e.target.pause()
                                e.target.currentTime = 0
                            }}
                        />
                    </div>
                ))}
            </section>

        </main>
    )
}

export default Profile