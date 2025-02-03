import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { sanityClient } from ".";


const builder = imageUrlBuilder(sanityClient);

export const urlFor = (src: SanityImageSource) => {
    return builder.image(src);
};
