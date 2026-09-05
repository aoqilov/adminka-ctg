import { useNavigate, useParams } from 'react-router-dom';

import { CusInput, CusSegment, type SegmentItem } from '@/components/ui';
import { storePath } from '@/constants/routes';
import ColorsTab from '@/features/store/tabs/ColorsTab';
import ContactsTab from '@/features/store/tabs/ContactsTab';
import LocationsTab from '@/features/store/tabs/LocationsTab';
import ServicesTab from '@/features/store/tabs/ServicesTab';
import SocialsTab from '@/features/store/tabs/SocialsTab';
import type { StoreTab } from '@/features/store/types';
import { plural } from '@/lib/format';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';

const TAB_IDS: readonly StoreTab[] = [
  'socials',
  'locations',
  'contacts',
  'services',
  'colors',
];

export default function FeatureStore() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const profile = useStoreSettingsStore((s) => s.profile);
  const patchProfile = useStoreSettingsStore((s) => s.patchProfile);
  const socials = useStoreSettingsStore((s) => s.socials);
  const locations = useStoreSettingsStore((s) => s.locations);
  const contacts = useStoreSettingsStore((s) => s.contacts);
  const services = useStoreSettingsStore((s) => s.services);
  const palette = useStoreSettingsStore((s) => s.palette);

  const active: StoreTab = TAB_IDS.includes(tab as StoreTab) ? (tab as StoreTab) : 'socials';

  const tabs: SegmentItem<StoreTab>[] = [
    {
      value: 'socials',
      label: 'Соцсети',
      sub: plural(socials.length, ['площадка', 'площадки', 'площадок']),
    },
    {
      value: 'locations',
      label: 'Адреса',
      sub: plural(locations.length, ['салон', 'салона', 'салонов']),
    },
    {
      value: 'contacts',
      label: 'Контакты',
      sub: plural(contacts.length, ['номер', 'номера', 'номеров']),
    },
    {
      value: 'services',
      label: 'Услуги',
      sub: plural(services.length, ['услуга', 'услуги', 'услуг']),
    },
    {
      value: 'colors',
      label: 'Цвета',
      sub: plural(palette.length, ['цвет', 'цвета', 'цветов']),
    },
  ];

  return (
    <div>
      <h1 className="mb-1 font-serif text-[32px] leading-tight">Магазин</h1>
      <p className="mb-6 text-muted">Данные салона, которые видит клиент на сайте.</p>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <CusInput
          label="Название"
          value={profile.title}
          onChange={(e) => patchProfile({ title: e.target.value })}
        />
        <CusInput
          label="Подзаголовок"
          value={profile.tagline}
          onChange={(e) => patchProfile({ tagline: e.target.value })}
        />
        <CusInput
          label="Ник в шапке сайта"
          value={profile.badgeHandle}
          onChange={(e) => patchProfile({ badgeHandle: e.target.value })}
        />
      </div>

      <CusSegment
        className="mb-5"
        items={tabs}
        value={active}
        onChange={(next) => navigate(storePath(next))}
      />

      {active === 'socials' && <SocialsTab />}
      {active === 'locations' && <LocationsTab />}
      {active === 'contacts' && <ContactsTab />}
      {active === 'services' && <ServicesTab />}
      {active === 'colors' && <ColorsTab />}
    </div>
  );
}
