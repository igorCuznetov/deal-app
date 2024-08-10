import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useRef, Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { Transition } from '@headlessui/react';
import { IconType } from 'react-icons';
import { FiUser, FiHeart } from 'react-icons/fi';
import { Search } from './Search';
import { MegaMenu } from './MegaMenu';
import { Collections, Locations, Categories } from '@/types';
import { BottomNavigation } from '@/components';
import { useSession, signOut } from 'next-auth/react';
import { LocaleSelector } from '@/components/header/LocaleSelector';
import { useClickAway } from 'react-use';
import { useRouter } from 'next/router';
import { FiChevronDown } from 'react-icons/fi';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';

import { ChevronsUpDown } from 'lucide-react';
import { Check } from 'lucide-react';
import { cn } from '@/utils';

export interface NavLink {
  name: string;
  href: string;
  collapsible?: boolean;
}

export const sideNavLinks: [string, IconType][] = [
  ['/wishlist', FiHeart],
  ['/signin', FiUser],
];

export const Header = ({
  collections,
  locations,
  categories,
}: {
  collections: Collections;
  locations: Locations;
  categories: Categories;
}) => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const [openLocations, setOpenLocations] = useState(false);
  const [locationValue, setLocationValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  const { data: session, status } = useSession();

  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const [isLocaleSelectorOpen, setIsLocaleSelectorOpen] = useState(false);

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const navLinks = [
    {
      name: t('common:searchTask'),
      href: '/tasks/list',
      collapsible: false,
    },
  ];

  useClickAway(ref, () => setIsLocaleSelectorOpen(false));
  if (status === 'loading') return <h1> {t('common:loading')}</h1>;

  return (
    <header>
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/">
              <span className={'font-bold text-lg'}>DEAL</span>
            </Link>
            <div className={'ml-4'}>
              <Popover open={openLocations} onOpenChange={setOpenLocations}>
                <PopoverTrigger asChild>
                  <Button
                    variant="white"
                    role="combobox"
                    className="w-[200px] justify-between"
                  >
                    {locationValue ? locationValue : t('locations:select')}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder={t('locations:search')} />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {locations?.length
                          ? locations
                              ?.sort((item) => {
                                if (item.id === 'chisinau') {
                                  return -1;
                                }

                                // todo: other should be sorted by tasks/users count

                                return 0;
                              })
                              ?.map((location) => (
                                <CommandItem
                                  key={location.id}
                                  value={t(`locations:${location.id}`)}
                                  onSelect={(currentValue) => {
                                    setLocationValue(
                                      currentValue === locationValue
                                        ? ''
                                        : currentValue,
                                    );
                                    setOpenLocations(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      locationValue ===
                                        t(`locations:${location.id}`)
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  <span className={'text-lg text-gray-700'}>
                                    {t(`locations:${location.id}`)}
                                  </span>
                                </CommandItem>
                              ))
                          : 'Loading'}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <ul className="hidden h-full md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="none">{t('common:createTask')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <DropdownMenuGroup>
                  {categories?.length
                    ? categories?.map((category) => (
                        <Fragment key={category.id}>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="py-3 px-4 text-lg cursor-pointer">
                              <Link
                                href={`/tasks/create/${category.id}`}
                                className="flex h-full items-center px-5"
                                onClick={handleCloseMenu}
                              >
                                {t(`categories:${category.id}`)}
                              </Link>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {category.subCategories?.map((subCategory) => (
                                  <Fragment key={subCategory.id}>
                                    <DropdownMenuItem
                                      className="py-3 px-4 text-lg cursor-pointer"
                                      asChild
                                    >
                                      <Link
                                        href={`/tasks/create/${category.id}/${subCategory.id}`}
                                        className="flex h-full items-center px-5"
                                        onClick={handleCloseMenu}
                                      >
                                        {t(`sub_categories:${subCategory.id}`)}
                                      </Link>
                                    </DropdownMenuItem>
                                  </Fragment>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </Fragment>
                      ))
                    : 'Loading'}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-neutral-700 transition-colors ${
                  hoveredNavLink === item && 'bg-violet-100 text-violet-700'
                }`}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                  onClick={handleCloseMenu}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto items-center md:flex">
            <Search onSearch={(value) => console.log(value)} />
            {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url} className="ml-5 hidden md:block">
                <Icon
                  className="text-neutral-700 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            ))}
            {session && (
              <button
                className="ml-5 hidden rounded-full border border-solid border-violet-700 p-[2px] md:block"
                onClick={() => signOut()}
              >
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="user profile image"
                    width={30}
                    height={30}
                    className="overflow-hidden rounded-full"
                    quality={100}
                  />
                )}
              </button>
            )}

            <div
              className="relative z-50 ml-6 flex cursor-pointer items-center"
              ref={ref}
              onClick={() => setIsLocaleSelectorOpen((prev) => !prev)}
            >
              <div className="relative mr-1.5 h-3.5 w-3.5 md:h-[14px] md:w-[17px]">
                <Image
                  priority
                  src={`/assets/${router.locale}-flag.svg`}
                  alt={`${router.locale} locale`}
                  fill
                />
              </div>
              <span>{router.locale?.toUpperCase()}</span>
              <FiChevronDown color="#fff"></FiChevronDown>
              <LocaleSelector isOpen={isLocaleSelectorOpen} />
            </div>
          </ul>
        </div>
        <Transition show={Boolean(hoveredNavLink?.collapsible)}>
          {hoveredNavLink && (
            <MegaMenu
              collections={collections}
              onShowMenu={() => handleShowMenu(hoveredNavLink)}
              onCloseMenu={handleCloseMenu}
            />
          )}
        </Transition>
      </div>
      <BottomNavigation navLinks={navLinks} collections={collections} />
    </header>
  );
};
