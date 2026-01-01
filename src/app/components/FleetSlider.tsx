import { useState, useEffect } from 'react';
import dryVanTrailer from 'figma:asset/9d5e9797d8f661b52eca808842b4166451abafac.png';
import reeferTrailer from 'figma:asset/8944eb0a79213c952bda45d8c7429d45cd9b3836.png';
import intermodalContainers from 'figma:asset/869cf340de0823b07756297596e25e2cb18a2000.png';
import './FleetSlider.css';

const slides = [
  { image: dryVanTrailer, alt: 'GSK Dry Van Trailer' },
  { image: reeferTrailer, alt: 'GSK Refrigerated Trailer' },
  { image: intermodalContainers, alt: 'GSK Intermodal Containers' }
];

export default function FleetSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fleet-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`fleet-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.alt} />
        </div>
      ))}
      
      <div className="fleet-slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`fleet-slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
