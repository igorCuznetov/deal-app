import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

import { useState } from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui';

export const Hero = () => {
  const { t } = useTranslation('home');
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="overflow-hidden bg-gray-100">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col px-4 md:flex-row">
        <div className="flex flex-col items-center mt-28 ml-[10%] pt-10 md:items-start md:px-4 md:pt-0 z-10">
          <h1
            data-aos="fade-right"
            data-aos-delay="300"
            className="mb-5 text-center text-[2.5rem] font-bold leading-tight text-black md:text-left md:text-5xl"
          >
            {t('hero.title')}
          </h1>
          <h3
            data-aos="fade-right"
            data-aos-delay="400"
            className="font-regular mb-5 text-center text-lg leading-tight text-neutral-700 md:mb-10 md:text-left"
          >
            {t('hero.description')}
          </h3>
          <div className="w-[600px] h-32 relative">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <div>
                  <Input
                    type="text"
                    placeholder={t('common:taskOrSpecialist')}
                    className="p-4 h-20 w-[600px] rounded-lg border shadow-md"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[600px] p-0">
                <Command className="rounded-lg border shadow-md">
                  <CommandList>
                    <CommandGroup>
                      <CommandItem className="h-12 text-lg">
                        <span>срочно нужен курьер</span>
                      </CommandItem>
                      <CommandItem className="h-12 text-lg">
                        <span>услуги электрика</span>
                      </CommandItem>
                      <CommandItem className="h-12 text-lg">
                        <span>генеральная уборка квартиры</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="absolute top-4 right-4">
              <Button variant="publish" size="large" type="submit">
                {t('common:find')}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute right-[11%] top-[15%] z-0">
          <Image
            priority
            src="/assets/hero5.png"
            alt="hero"
            quality={100}
            width={700}
            height={700}
            data-aos="fade-up"
          />
        </div>
      </div>
    </div>
  );
};
