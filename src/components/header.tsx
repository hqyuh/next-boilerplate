/* eslint-disable max-len */
import { HStack } from '@/components/common';
import LocaleSwitcherSelect from '@/components/locale-switcher-select';
import { Button } from '@/components/ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from './mode-toggle';

const urlLogo =
  'https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png';

export default async function Header() {
  const { userId } = await auth();
  const locale = await getLocale();
  const t = await getTranslations('header');

  return (
    <HStack align={'center'} pos={'apart'} className='px-5 pt-1'>
      <Image src={urlLogo} alt='Header Logo' width={50} height={40} />
      <HStack align={'center'}>
        <ModeToggle />
        <LocaleSwitcherSelect />
        {userId ? (
          <div className='flex items-center justify-center'>
            <SignedIn>
              <UserButton afterSwitchSessionUrl='/' />
            </SignedIn>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-1'>
            <Button>
              <Link
                href={{
                  pathname: `/${locale}/sign-in`
                }}
              >
                {t('signIn')}
              </Link>
            </Button>
            <Button>
              <Link
                href={{
                  pathname: `/${locale}/sign-up`
                }}
              >
                {t('signUp')}
              </Link>
            </Button>
          </div>
        )}
      </HStack>
    </HStack>
  );
}
