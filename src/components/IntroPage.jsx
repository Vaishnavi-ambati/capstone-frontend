import React, { useState, useEffect } from 'react';
import intro from "../assets/main.PNG"
import trash from "../assets/trash-bin.png"
import garbage from "../assets/garbage-bag.png"
import dump from "../assets/dumpster-fire.png"
import arrow from "../assets/arrow-right.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { NavBar } from './Navbar';

function IntroPage() {
  const [animationIndex, setAnimationIndex] = useState(0);
  const words = ["Upload,", "track,", "optimize,"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  const content = [
    { id: 1,  icon: trash, title: 'Garbage Pickup for Home', description: 'Residential Recycling is available in many areas where we offer garbage pickup.' },
    { id: 2, icon: garbage, title: 'Business Waste', description: 'Our Commercial Waste Collection service provides your business with a range of dumpsters and service schedules to meet your needs.' },
    { id: 3, icon: dump, title: 'Dumpster Rental', description: 'Our Roll Off Dumpster services offer a range of container sizes suitable for commercial, residential, and construction needs.' },
  ];

  const responsiveItems = [
    { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    { breakpoint: { max: 1024, min: 768 }, items: 2 },
    { breakpoint: { max: 768, min: 0 }, items: 1 },
  ];

  return (
    <>
    <NavBar/>
    <div className='relative bg-white'>
  <div className="container mx-auto grid grid-cols-2">
    <div className="col-span-1 flex flex-col justify-center items-center text-center font-protest-riot text-gray-800">
      <h1 className="text-4xl">The Waste Management tool designed to help your business comply.</h1>
      <p className="text-xl mt-4"> {words.slice(0, animationIndex + 1).join(' ')} comply with just a few clicks <span className="opacity-0"> {words[animationIndex]}</span> </p>
      <div className="mt-8">
        <Link to='/login'>
        <button className="bg-green-800 text-white px-8 py-2 rounded-md hover:shadow-lg mr-10"> Staff Login</button></Link>
        <Link to='/login'><button className="bg-green-800 text-white px-8 py-2 rounded-md hover:shadow-lg">Manager Login</button></Link>
      </div>
    </div>
    <div className="col-span-1">
      <img src={intro} alt='hero-image' className='min-h-screen border-none' />
    </div>
  </div>
</div>
</>
  
  
  );
}

export default IntroPage;
