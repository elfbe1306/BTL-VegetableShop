import React, { useState } from "react";
import styles from "./VideoPlayer.module.css";
import VideoPlayIcon from '../../assets/icons/VideoPlayIcon';

const VideoPlayer = () => {
    const [showVideo, setShowVideo] = useState(false);

    return(
        <div className={styles.videoContainer}>
            {!showVideo ? (
                <div className={styles.overlayContent}>
                    <p>We’re the Best Organic <br/> Farm in the World</p>
                    <button onClick={() => setShowVideo(true)}>
                        <VideoPlayIcon className={styles.videoPlayIcon} />
                    </button>
                </div>
            ) : (
                <video 
                    className={styles.video}  
                    autoPlay
                    loop
                    src="/CommercialVideo.mp4" >
                </video>
            )}
        </div>
    )
}

export default VideoPlayer;