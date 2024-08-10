import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'Deal',
  titleTemplate: '%s | Deal',
  description:
    'Ecommerce built with T3 Stack : NextJS, TypeScript, tRPC, Prisma, NextAuth and styled with Tailwind CSS',
  canonical: 'https://karashop.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://karashop.vercel.app',
    siteName: 'Deal',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default config;
