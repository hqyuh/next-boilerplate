import LocaleSwitcherSelect from '@/components/locale-switcher-select';
import Image from 'next/image';

import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div className='flex items-center justify-between px-5 pt-1'>
      <Image
        // eslint-disable-next-line max-len
        src='https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
        alt='Header Logo'
        width={50}
        height={40}
      />
      <div className='flex items-center space-x-4'>
        <ModeToggle />
        <LocaleSwitcherSelect />
        {/* <div>
          <SignedIn>
            <UserButton afterSwitchSessionUrl='/' />
          </SignedIn>
        </div> */}
      </div>
    </div>
  );
}
