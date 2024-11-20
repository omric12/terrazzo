export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'סתיו טראצו',
  description:
    'סדנאות טראצו, מוצרי DIY וחומרי גלם איכותיים ליצירת טראצו מודרני',
  url: 'https://www.starrazzo.com',
  logo: 'https://www.starrazzo.com/starrazzo.png',
  sameAs: [
    'https://www.instagram.com/starrazzo_/',
    // Add other social media URLs
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IL',
  },
};

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ערכת טראצו DIY',
  description:
    'ערכה מלאה ליצירת טראצו בבית, כולל כל החומרים הנדרשים והדרכה מפורטת',
  brand: {
    '@type': 'Brand',
    name: 'סתיו טראצו',
  },
};
