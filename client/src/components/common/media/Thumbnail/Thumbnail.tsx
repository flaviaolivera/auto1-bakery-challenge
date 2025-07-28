import React from 'react';
import styles from './Thumbnail.module.scss';

export interface ThumbnailProps {
  src: string;
  alt: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  alt,
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={styles.thumbnail}
      loading="lazy"
    />
  );
};