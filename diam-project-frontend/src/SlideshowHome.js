import Carousel from 'react-bootstrap/Carousel';
import slide1 from './assets/electrician.jpg';
import slide2 from './assets/plumber.jpg';
import slide3 from './assets/carpenter.jpg';
import slide4 from './assets/roofers.jpg';

function SlideshowHome() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide1}
          alt="Primeiro slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Segundo slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Terceiro slide"
        />
      </Carousel.Item>
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide4}
          alt="Quarto slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideshowHome;
