import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { Task } from '@/types';
import { numberWithCommas } from '@/utils';

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent`;

export const Skeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-2">
      <div className={`h-[350px] rounded-2xl bg-neutral-200 ${shimmer}`} />
      <div className="my-3 space-y-3 px-1">
        <div className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`h-[40px] w-[40px] rounded-full bg-neutral-200 ${shimmer}`}
              ></div>
            ))}
        </div>
        <div className={`h-4 w-full rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className="flex justify-between">
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
};

export const TaskItem = ({
  id,
  title,
  price = 0,
  rate,
  images = [
    {
      imageURL:
        'https://img.freepik.com/premium-photo/construction-site-inspector-chibi-character-overseeing-rural-development-project_1018494-951.jpg?size=626&ext=jpg',
      imageBlur:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=',
    },
    {
      imageURL:
        'https://img.freepik.com/premium-photo/illustration-house-construction-site-cityscape-background-illustration-brickhouse-with-roof-blocks-workers-cottage-concrete-mixer-crane-food-trucks_76964-312625.jpg?w=1380',
      imageBlur:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=',
    },
  ],
  createdAt,
  priceUnit,
}) => {
  const [currentImage, setCurrentImage] = useState(
    'https://img.freepik.com/premium-photo/construction-site-inspector-chibi-character-overseeing-rural-development-project_1018494-951.jpg?size=626&ext=jpg',
  );

  const productLink = `/product/${id}/slug`;

  console.log('priceUnit', priceUnit);

  return (
    <div className="group rounded-2xl bg-white p-2">
      <div className="relative h-[100px] overflow-hidden rounded-2xl transition sm:h-[200px]">
        <Link href={productLink} className="relative block h-full w-full">
          {images.map(({ imageURL, imageBlur }) => (
            <Image
              key={imageURL}
              src={imageURL}
              alt={`${name} image`}
              className={clsx('absolute h-full w-full duration-700 ', {
                'opacity-100': currentImage === imageURL,
                'opacity-0': currentImage !== imageURL,
              })}
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL={imageBlur}
            />
          ))}
        </Link>
      </div>
      <div className="mb-1 mt-2 space-y-4 px-1">
        <div className="flex gap-2">
          {images.map(({ imageURL, imageBlur }, index) => (
            <button
              key={index}
              className="h-[40px] w-[40px] overflow-hidden rounded-full"
              onClick={() => setCurrentImage(imageURL)}
            >
              <Image
                src={imageURL}
                alt={`${name} image ${index + 1}`}
                className="object-cover"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL={imageBlur}
              />
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-base font-medium">{title}</h2>
          <h3 className="text-xs font-normal capitalize text-neutral-400">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">
            {price ?? 'Договорная цена'}{' '}
            {price && priceUnit ? priceUnit : price ? '$' : ''}
          </h3>
          <div className="flex items-center justify-center text-xs font-medium text-neutral-500">
            <BsStarFill size="11px" className="mr-1 text-yellow-400" />
            <h4>
              {rate} ({Math.floor(Math.random() * 1000) + 1} Views)
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
