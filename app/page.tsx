"use client"
import Image from "next/image";
import React, { useState } from "react"
import styles from "./page.module.css";
import Replay from "./ui/replay/replay";
import Steps from "./ui/steps/steps";


function Home() {
	const [ selectedService, setSelectedService ] = useState<string>()
	const [ completedServiceStep, setCompletedServiceStep ] = useState<boolean>(false) 

	function selectService(service: string) {
		setSelectedService(service);
		setCompletedServiceStep(false);
	}

	return (
		<main className={styles.main}>
			<div className="rounded shadow-2xl p-10 w-3/4">
				<div className="text-3xl font-bold text-center underline subpixel-antialiased mb-5">
					Cogram
					<div className="inline-block mr-2 ml-2">
						<Image
							src="/logos/chrome.svg"
							width={40}
							height={40}
							alt="Zoom Logo"
						/>
					</div>
					Relay
				</div>
				<div className="text-l text-center subpixel-antialiased">
					Cogram Chrome Relay helps you capture all moments that matter from your online meetings, livestreams and more.
					<br />
					Just follow the instructions to get started.
				</div>
				<div className="flex flex-row m-5">
					<div className="basis-4/12 m-2">
						<div className="flex flex-col justify-between h-full">
							<div className={"flex flex-row items-center self-auto rounded \
											shadow-md mb-3 p-5 cursor-pointer hover:shadow-xl \
											transition-all border-solid border-2 " + (selectedService == "zoom" ? "border-gray-500" :"border-gray-100")}
											onClick={()=> selectService("zoom")}>
								<div className="relative w-1/3 m-4 h-4">
									<Image
										src="/logos/zoom.svg"
										layout='fill'
										objectFit='contain'
										alt="Zoom Logo"
									/>
								</div>
								<div className="w-2/3">
									I'm joining a Zoom meeting
								</div>
								
							</div>
							<div className={"flex flex-row rounded shadow-md w-full mb-3 \
											p-5 cursor-pointer hover:shadow-xl transition-all\
											border-solid border-2 " + (selectedService == "googleMeet" ? "border-gray-500" :"border-gray-100")}
											onClick={()=> selectService("googleMeet")}>
								<div className="relative w-1/3 m-4 h-4">
									<Image
										src="/logos/meet.svg"
										layout='fill'
										objectFit='contain'
										alt="Google Meet Logo"
									/>
								</div>
								<div className="w-2/3">
									I'm joining a Google Meet meeting
								</div>
							</div>
							<div className={"flex flex-row rounded shadow-md w-full mb-3 p-5 \
											cursor-pointer hover:shadow-xl transition-all \
											border-solid border-2 " + (selectedService == "youtube" ? "border-gray-500" :"border-gray-100")}
											onClick={()=> selectService("youtube")}>
								<div className="relative w-1/3 m-4 h-4">
									<Image
										src="/logos/youtube.svg"
										layout='fill'
										objectFit='contain'
										alt="YouTube Logo"
									/>
								</div>
								<div className="w-2/3">
									I'm recording a YouTube livestream
								</div>
							</div>
							<div className={"flex flex-row rounded shadow-md w-full p-5 \
											cursor-pointer hover:shadow-xl transition-all \
											border-solid border-2 " + (selectedService == "twitch" ? "border-gray-500" :"border-gray-100")}
											onClick={()=> selectService("twitch")}>
								<div className="relative w-1/3 m-4 h-4">
									<Image
										src="/logos/twitch.svg"
										layout='fill'
										objectFit='contain'
										alt="Twitch Logo"
									/>
								</div>
								<div className="w-2/3">
									I'm recording a Twitch livestream
								</div>
							</div>
						</div>
					</div>
					
					
					<div className="basis-4/12 m-2">
						{selectedService ? <Steps
												selectedService={selectedService}
												setCompletedServiceStep={setCompletedServiceStep}
											/>: undefined}
					</div>
					<div className="basis-4/12 m-2">
						{ completedServiceStep ? <Replay/> : undefined}
					</div>
				</div>

			</div>
		</main>
		); 

}

export default Home;

