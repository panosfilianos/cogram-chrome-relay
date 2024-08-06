"use client";

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image";
import styles from "./replay.module.css";
import io from "socket.io-client"

const socket = io("http://localhost:5001", {
    autoConnect: false
});

function Replay() {

	const [ stream, setStream ] = useState<MediaStream | undefined>();
	const [ socketId, setSocketId ] = useState();
    const [ initializingStream, setInitializingStream ] = useState<boolean>(true);
    const [ socketConnected, setSocketConnected ] = useState<boolean>(false);

    // video element used for testing to validate that data was captured correctly
	const myVideo = useRef<HTMLVideoElement>(null);

	useEffect(() => {
        // get the audio, video from the display media
		navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then((displayStream) => {
            // then, get the microphone audio
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(microphoneStream => {
                // Chrome can send only one audio and one video track
                // Streams need to be combined before sent
                const combinedStream = new MediaStream();

                // Add screen video tracks to the combined stream
                displayStream.getVideoTracks().forEach(track => combinedStream.addTrack(track));
    
                // Add audio tracks to the combined stream
                const audioContext = new AudioContext();
                const destination = audioContext.createMediaStreamDestination();
                audioContext.createMediaStreamSource(displayStream).connect(destination);
                audioContext.createMediaStreamSource(microphoneStream).connect(destination);
                destination.stream.getAudioTracks().forEach(track => combinedStream.addTrack(track));
    
                setStream(combinedStream);
                // you can uncomment if you'd like for your UI
                // to have live playback of the captured media
                // myVideo.current.srcObject = displayStream;
                socket.connect();
            });
		});

        // handle socket communication

        socket.on("socketConnected", () => {
            setSocketConnected(true);
            setInitializingStream(false);
        })

        socket.on("socketId", (id) => {
            setSocketId(id);
        });

        // handle connection errors

        socket.on("connect_error", (error) => {
            setSocketConnected(false);
            setInitializingStream(false);
        });

        socket.on("connect_failed", (error) => {
            setSocketConnected(false);
            setInitializingStream(false);
        });

        socket.on("disconnect", (error) => {
            setSocketConnected(false);
            setInitializingStream(false);
        });

	}, []);

    // start emitting stream data only when
    // you have access to the stream and 
    // the socket has properly connected
    useEffect(() => {
        if (socketId && stream && socketConnected) {
            startEmittingStreamData();
        }
        
    }, [socketId, stream, socketConnected]);

    const startEmittingStreamData = () => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000); // Record in 1 second chunks

        mediaRecorder.ondataavailable = event => {
            // Send screen and audio data to the server
            if (event.data.size > 0) {
                socket.emit('mediaData', event.data);
            }
        };
    }

    return (
        <div className="rounded shadow-md w-full h-full p-5">
            <div className="text-lg font-bold">
                {initializingStream ?
                    "Connecting to your stream..." :
                    socketConnected ? "Success!": "There's a problem!"
                }
            </div>
            <div className={"text-sm " + (!initializingStream && !socketConnected ? "text-red-500": "")}>
            {initializingStream ?
                    "We are connecting to your tab. Make sure to give the required permissions." :
                    socketConnected ? "Your stream is being recorded by Cogram.": "Your stream is NOT being recorded"
                }
            </div>
            {!initializingStream && socketConnected ?
                <div className="flex rounded-md flex-row mt-5 p-5 border-2 border-amber-500">
                    <div className="w-1/5">
                        <Image
                            src="/icons/warning.svg"
                            width={20}
                            height={20}
                            alt="YouTube Logo"
                        />
                    </div>
                    <div className="w-4/5">
                        <div className="text-sm font-bold">
                            Don't close the tab!
                        </div>
                        <div className="text-sm">
                            Leave the meeting tab open while the call is still going.
                        </div>
                    </div>
                </div> : ""

            }
            <div>
                <div>
                    <video ref={myVideo} className={styles.video} autoPlay playsInline />
                </div>
            </div>
        </div>


    ) 
}

export default Replay;