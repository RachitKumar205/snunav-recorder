'use client'
// pages/create-waypoint.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardHeader, CardBody, CardFooter, Divider, Chip, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

function CreateWaypoint() {
    const [name, setName] = useState('');
    const [wp_id, setWp_id] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const getUserLocation = async () => {
            if (navigator.geolocation) {
                try {
                    await navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setLatitude(position.coords.latitude);
                            setLongitude(position.coords.longitude);
                        },
                        (error) => {
                            console.error("Error getting location:", error);
                            setError("Unable to determine your location. Please try again or enter it manually.");
                        }
                    );
                } catch (error) {
                    console.error("Error accessing Geolocation API:", error);
                    setError("Geolocation is not supported in your browser.");
                }
            } else {
                console.error("Geolocation API is not supported in this browser.");
                setError("Geolocation is not supported in your browser.");
            }
        };

        getUserLocation();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://3c369d4b-dae1-4911-a6ca-ec86d65cb9e0-00-28jopz1ld9yxf.riker.replit.dev/meshnav/', {
                name,
                wp_id,
                latitude,
                longitude,
            });

            // Handle successful response
            console.log('Waypoint created successfully:', response.data);
            // Clear form fields, redirect, or display a success message
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className={"bg-black items-center justify-center flex"}>
            {error && <p>Error: {error}</p>}


            <form onSubmit={handleSubmit}>
            <Card className="max-w-[500px] min-w-[100px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-4xl">snuNav Recorder</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Input type="text" className={"mb-4"} variant="bordered" label="Name" onChange={(e) => setName(e.target.value)}/>
                    <Input type="text" className={"mb-4"} variant="bordered" label="Waypoint ID" onChange={(e) => setWp_id(e.target.value)}/>
                    <div className={"flex-row mb-4"}>
                        <Chip size="lg" color={"primary"} className={"mr-2"}>Lat: {latitude}</Chip>
                        <Chip size="lg" color={"primary"}>Long: {longitude}</Chip>
                    </div>
                    <Button color="primary" variant="ghost" type={"submit"}>
                        Submit
                    </Button>
                </CardBody>
            </Card>
            </form>
        </div>
    );
}

export default CreateWaypoint;
