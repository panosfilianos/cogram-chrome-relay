"use client"
import React, { useState } from "react"

function Steps({selectedService, setCompletedServiceStep}) {

    function stepsCompleted() {
        setCompletedServiceStep(true);
    }

    if (selectedService == "zoom") {
        return (
            <div className="rounded shadow-md w-full h-full transition-all divide-y">
                <div className="flex flex-row p-5">
                    <div className="w-1/3">
                        <div className="border-0 m-5 bg-gray-500  h-10 rounded-full flex items-center justify-center text-white">
                            1
                        </div>
                    </div>
                    <div className="w-2/3">
                        <div>
                            Make sure you join the meeting using <b>Zoom for Web</b>
                        </div>
                        <div className="text-sm mt-5">
                            If you don't know how, <a className="text-blue-600 dark:text-blue-500 hover:underline" href="https://www.youtube.com/watch?v=cDZOx-N39EU"target="_blank">click here</a>.
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-row p-5">
                    <div className="w-1/3">
                        <div className="border-0 m-5 bg-gray-500  h-10 rounded-full flex items-center justify-center text-white">
                            2
                        </div>
                    </div>
                    <div className="w-2/3">
                        Open the tab of your meeting in <b>Google Chrome</b>
                    </div>
                </div>
                <div className="flex flex-row p-5">
                    <div className="w-1/3">
                        <div className="border-0 m-5 bg-gray-500  h-10 rounded-full flex items-center justify-center text-white">
                            3
                        </div>
                    </div>
                    <div className="w-2/3">
                        Select your meeting, to keep notes
                        <div className="text-white mt-2 w-fit bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium
                                        rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700
                                        focus:outline-none dark:focus:ring-blue-800"
                                        onClick={stepsCompleted}>
                            Select my meeting
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (selectedService == "googleMeet") {
        return (
            <div></div>
        );
    } else if (selectedService == "youtube") {
        return (
            <div></div>
        );
    } else if (selectedService == "twitch") {
        return (
            <div></div>
        );
    }
}

export default Steps
