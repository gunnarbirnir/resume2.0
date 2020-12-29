export const PDF_MODE = process.env.GATSBY_PDF_MODE === 'true';
export const SLIDE_UP_ANIMATION = !PDF_MODE ? 'slide-up' : undefined;
export const SLIDE_UP_DURATION = !PDF_MODE ? '500' : undefined;
