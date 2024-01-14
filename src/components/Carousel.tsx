'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Import images
import img1 from '../img/image1.jpg';
import img2 from '../img/image2.jpg';
import img3 from '../img/image3.jpg';

const Carousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const slides = [img1, img2, img3];

    const goToNextSlide = () => {
        setIsSliding(true);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            setIsSliding(false);
        }, 2000); // Change slide after 2 seconds (same as the duration of the slide-out animation)
    };

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds (3 seconds for viewing + 2 seconds for sliding)
        return () => clearInterval(timer); // Clear the timer when the component is unmounted
    }, []);

    return (
        <div className="flex pb-20 pt-20 justify-center">
            <div className="w-full max-w-lg transition-all duration-500 ease-in-out transform">
                {isClient && <Image src={slides[currentSlide]} className={isSliding ? 'slide-out' : 'slide-in'} alt="carousel" width={500} height={300} />}
            </div>
        </div>
    );
};

export default Carousel;