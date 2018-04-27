import gql from 'graphql-tag';

import { FeedsPhotoFragment } from '../../Screens/FeedsScreen/fragments'

export default gql`
  mutation($caption: String, $imageUrl: String) {
    createPhoto(caption: $caption, imageUrl: $imageUrl) {
      ...feedsPhoto
    }
  }
  ${FeedsPhotoFragment}
`;