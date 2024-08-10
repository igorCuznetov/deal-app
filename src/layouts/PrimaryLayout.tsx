import React from 'react';
import { api } from '@/utils/api';
import { NextSeo, type NextSeoProps } from 'next-seo';
import { Header, Footer } from '@/components';

interface PrimaryLayoutProps extends React.PropsWithChildren {
  seo: NextSeoProps;
}

export const PrimaryLayout = ({ seo, children }: PrimaryLayoutProps) => {
  const { data: collections } = api.collection.all.useQuery();
  const { data: locations } = api.location.all.useQuery();
  const { data: categories } = api.category.all.useQuery();

  return (
    <>
      <NextSeo noindex={true} nofollow={true} {...seo} />
      <div className="min-h-screen">
        <Header
          collections={collections}
          locations={locations}
          categories={categories}
        />
        {children}
      </div>
      <Footer />
    </>
  );
};
