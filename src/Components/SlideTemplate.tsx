import React from 'react';
import { useNavigate } from 'react-router-dom';

const SlideTemplate = ({ src, description, onClickPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(onClickPath);
  };

  return (
    <div>
      <img
        src={src}
        alt="image"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default SlideTemplate;
