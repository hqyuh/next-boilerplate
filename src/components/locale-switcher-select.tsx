/* eslint-disable react-refresh/only-export-components */
'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import withClientOnly from '@/hocs/withClientOnly';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react-refresh/only-export-components */

const LocaleSwitcherSelect = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value }
      );
    });
  }

  return (
    <label className={clsx(isPending && 'transition-opacity [&:disabled]:opacity-30')}>
      <Select onValueChange={onSelectChange} defaultValue={locale}>
        <SelectTrigger
          className={cn('w-[130px] rounded-sm bg-white font-bold ring-0 focus:ring-0', 'dark:bg-black dark:text-white')}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup></SelectGroup>
          {routing.locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t('locale', { locale: cur })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
};

export default withClientOnly(LocaleSwitcherSelect);
