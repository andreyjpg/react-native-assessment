import { createApi } from "unsplash-js";
import { ColorId, Orientation } from "unsplash-js";
import { UNSPLASH_KEY } from "@env";

const unsplash = createApi({
  accessKey: UNSPLASH_KEY,
});

const getPhotos = (
  query: string,
  color: ColorId | undefined,
  orientation: Orientation | undefined,
  page: number
) =>
  unsplash.search
    .getPhotos({
      query: query,
      perPage: 30,
      page: page,
      color: color,
      orientation: orientation,
    })
    .then((res) => {
      if (res.errors) {
        throw new Error(`error ocurred: ${res.errors[0]}`);
      } else {
        const { results } = res.response;
        return results;
      }
    })
    .catch((err) => {
      throw new Error(`error ocurred: ${err.message}`);
    });

const getPhotoById = (id: string) =>
  unsplash.photos
    .get({ photoId: id })
    .then((res) => {
      if (res.errors) {
        throw new Error(`error ocurred: ${res.errors[0]}`);
      } else {
        return res.response;
      }
    })
    .catch((err) => {
      throw new Error(`error ocurred: ${err.message}`);
    });

export { getPhotos, getPhotoById };
