'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

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
    <label className={cn(isPending && 'transition-opacity [&:disabled]:opacity-30')}>
      <Select onValueChange={onSelectChange} defaultValue={locale}>
        <SelectTrigger className='w-[130px] rounded-full'>
          <SelectValue placeholder='Select a language' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            {routing.locales.map((cur) => (
              <SelectItem key={cur} value={cur}>
                {t('locale', { locale: cur })}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  );
};

export default LocaleSwitcherSelect;
