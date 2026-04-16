import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const FALLBACK_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4"

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
    const videoRefs = useRef(new Map())

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target
                    if (!(video instanceof HTMLVideoElement)) return

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        video.play().catch(() => { })
                    } else {
                        video.pause()
                    }
                })
            },
            { threshold: [0.6] }
        )

        videoRefs.current.forEach((vid) => observer.observe(vid))

        return () => observer.disconnect()
    }, [items])

    const setVideoRef = (id) => (el) => {
        if (!el) {
            videoRefs.current.delete(id)
            return
        }
        videoRefs.current.set(id, el)
    }

    return (
        <div className="reels-page">
            <div className="reels-feed">

                {items.length === 0 && (
                    <div className="empty-state">
                        <p>{emptyMessage}</p>
                    </div>
                )}

                {items.map((item) => (
                    <section key={item._id} className="reel">

                        <video
                            ref={setVideoRef(item._id)}
                            className="reel-video"
                            src={item.video || FALLBACK_VIDEO}
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            onError={(e) => {
                                e.target.src = FALLBACK_VIDEO
                            }}
                        />

                        <div className="reel-overlay">
                            <div className="reel-actions">

                                {/* LIKE */}
                                <div className="reel-action-group">
                                    <button
                                        onClick={() => onLike && onLike(item)}
                                        className="reel-action"
                                    >
                                        ❤️
                                    </button>
                                    <div className="reel-action__count">
                                        {item.likeCount ?? 0}
                                    </div>
                                </div>

                                {/* SAVE */}
                                <div className="reel-action-group">
                                    <button
                                        onClick={() => onSave && onSave(item)}
                                        className="reel-action"
                                    >
                                        🔖
                                    </button>
                                    <div className="reel-action__count">
                                        {item.savesCount ?? 0}
                                    </div>
                                </div>

                                {/* COMMENTS */}
                                <div className="reel-action-group">
                                    <button className="reel-action">
                                        💬
                                    </button>
                                    <div className="reel-action__count">
                                        {item.commentsCount ?? 0}
                                    </div>
                                </div>

                            </div>

                            <div className="reel-content">
                                <p className="reel-description">
                                    {item.description || "No description"}
                                </p>

                                {item.foodPartner && (
                                    <Link
                                        className="reel-btn"
                                        to={"/food-partner/" + item.foodPartner}
                                    >
                                        Visit store
                                    </Link>
                                )}
                            </div>
                        </div>

                    </section>
                ))}

            </div>
        </div>
    )
}

export default ReelFeed