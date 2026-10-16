import { designAssets } from '../design/assets';

// Original image fills from the updated Figma review section.
export const updatedReviewImages = {
  clearExplanations: '/assets/review-clear-explanations.png',
  inspiredToBake: '/assets/review-inspired-to-bake.png',
  warmAtmosphere: '/assets/review-warm-atmosphere.png',
};

// Preserve the image crops from Figma without reducing source resolution.
export const reviewCrops: Record<
  string,
  {
    width: number;
    height: number;
    radius: number;
    imageWidth: string;
    imageHeight: string;
    left: string;
    top: string;
  }
> = {
  [updatedReviewImages.inspiredToBake]: {
    width: 194,
    height: 139,
    radius: 10,
    imageWidth: '118.5%',
    imageHeight: '195.14%',
    left: '-4.93%',
    top: '-34.33%',
  },
  [updatedReviewImages.clearExplanations]: {
    width: 191,
    height: 129,
    radius: 11,
    imageWidth: '118.33%',
    imageHeight: '206.74%',
    left: '-3.19%',
    top: '-33.82%',
  },
  [updatedReviewImages.warmAtmosphere]: {
    width: 191,
    height: 131,
    radius: 14,
    imageWidth: '115.67%',
    imageHeight: '199.29%',
    left: '-2.56%',
    top: '-30.77%',
  },
};

// Same images and order as the desktop review collage.
export const reviewImages = [
  designAssets.ReviewsDesign.img202608131435361,
  designAssets.ReviewsDesign.img202608131434161,
  designAssets.ReviewsDesign.img202608131434291,
  updatedReviewImages.inspiredToBake,
  updatedReviewImages.clearExplanations,
  designAssets.ReviewsDesign.img202608131434593,
  designAssets.ReviewsDesign.img202608131435212,
  designAssets.ReviewsDesign.img202608131435582,
  designAssets.ReviewsDesign.imgPhoto12202609280141301,
  designAssets.ReviewsDesign.imgPhoto17202609280141301,
  designAssets.ReviewsDesign.imgPhoto4202609280141301,
  designAssets.ReviewsDesign.imgPhoto2202609280141301,
  designAssets.ReviewsDesign.imgPhoto5202609280141301,
  updatedReviewImages.warmAtmosphere,
  designAssets.ReviewsDesign.imgPhoto1202609280141301,
  designAssets.ReviewsDesign.imgImage21,
  designAssets.ReviewsDesign.imgImage23,
  designAssets.ReviewsDesign.imgImage24,
  designAssets.ReviewsDesign.imgImage26,
  designAssets.ReviewsDesign.imgImage25,
  designAssets.ReviewsDesign.imgPhoto9202609280141302,
];
