import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImagesProps {
  data: {
    src: string;
    title: string;
    description: string;
  }[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClickImage = (index: number) => {
    onClick(index);
  };

  return (
    <div className='images-container'>
      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          key={index}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img 
            src={slide.src} 
            alt={slide.description} 
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
          />
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '10px',
                  textAlign: 'center',
                }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.3 }}
              >
                {slide.title}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Images;
