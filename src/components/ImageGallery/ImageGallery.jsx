import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

const ImageGallery = ({ imagesData }) => {
  return (
    <ImagesList>
      {imagesData.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li key={id}>
            <ImageGalleryItem
              previewURL={webformatURL}
              imageURL={largeImageURL}
              tags={tags}
            />
          </li>
        );
      })}
    </ImagesList>
  );
};

export default ImageGallery;
