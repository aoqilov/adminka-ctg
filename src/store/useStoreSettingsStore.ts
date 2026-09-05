import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  Contact,
  PaletteColor,
  Service,
  Social,
  StoreLocation,
  StoreProfile,
} from '@/features/store/types';
import { moveItem } from '@/hooks/useDragSort';
import { DEFAULT_PALETTE } from '@/constants/store';
import { makeId } from '@/lib/slug';
import {
  SEED_CONTACTS,
  SEED_LOCATIONS,
  SEED_SERVICES,
  SEED_SOCIALS,
} from '@/store/seed';
import type { Id } from '@/types/common';

type StoreSettingsState = {
  profile: StoreProfile;
  socials: Social[];
  locations: StoreLocation[];
  contacts: Contact[];
  services: Service[];
  palette: PaletteColor[];
};

type StoreSettingsActions = {
  patchProfile: (patch: Partial<StoreProfile>) => void;

  addSocial: () => void;
  patchSocial: (id: Id, patch: Partial<Social>) => void;
  removeSocial: (id: Id) => void;

  addLocation: () => void;
  patchLocation: (id: Id, patch: Partial<StoreLocation>) => void;
  setMainLocation: (id: Id) => void;
  removeLocation: (id: Id) => void;

  addContact: () => void;
  patchContact: (id: Id, patch: Partial<Contact>) => void;
  removeContact: (id: Id) => void;

  addService: () => void;
  patchService: (id: Id, patch: Partial<Service>) => void;
  setOpenService: (id: Id) => void;
  reorderServices: (from: number, to: number) => void;
  removeService: (id: Id) => void;

  addColor: () => void;
  patchColor: (id: Id, patch: Partial<PaletteColor>) => void;
  removeColor: (id: Id) => void;
};

/** `id` bo'yicha bitta elementni yangilaydigan umumiy yordamchi */
const patchById = <T extends { id: Id }>(list: T[], id: Id, patch: Partial<T>): T[] =>
  list.map((x) => (x.id === id ? { ...x, ...patch } : x));

export const useStoreSettingsStore = create<StoreSettingsState & StoreSettingsActions>()(
  persist(
    (set) => ({
      profile: {
        title: 'Amira Bridal',
        tagline: 'Свадебные платья и аксессуары · Ташкент',
        badgeSocial: 'Instagram',
        badgeHandle: '@amira_bridal',
      },
      socials: SEED_SOCIALS,
      locations: SEED_LOCATIONS,
      contacts: SEED_CONTACTS,
      services: SEED_SERVICES,
      palette: [...DEFAULT_PALETTE],

      patchProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      addSocial: () =>
        set((s) => ({
          socials: [
            ...s.socials,
            {
              id: makeId('s_'),
              platform: 'Новая площадка',
              handle: '@',
              url: '',
              hex: '#5980A6',
              active: false,
            },
          ],
        })),
      patchSocial: (id, patch) => set((s) => ({ socials: patchById(s.socials, id, patch) })),
      removeSocial: (id) => set((s) => ({ socials: s.socials.filter((x) => x.id !== id) })),

      addLocation: () =>
        set((s) => ({
          locations: [
            ...s.locations,
            {
              id: makeId('l_'),
              name: 'Новый салон',
              address: '',
              note: '',
              hours: 'Пн–Вс · 10:00 – 20:00',
              phone: '',
              main: false,
            },
          ],
        })),
      patchLocation: (id, patch) => set((s) => ({ locations: patchById(s.locations, id, patch) })),
      setMainLocation: (id) =>
        set((s) => ({ locations: s.locations.map((x) => ({ ...x, main: x.id === id })) })),
      removeLocation: (id) => set((s) => ({ locations: s.locations.filter((x) => x.id !== id) })),

      addContact: () =>
        set((s) => ({
          contacts: [
            ...s.contacts,
            {
              id: makeId('c_'),
              name: 'Новый контакт',
              role: '',
              phone: '',
              hours: 'Пн–Вс · 10:00 – 20:00',
              telegram: false,
              tgUrl: '',
            },
          ],
        })),
      patchContact: (id, patch) => set((s) => ({ contacts: patchById(s.contacts, id, patch) })),
      removeContact: (id) => set((s) => ({ contacts: s.contacts.filter((x) => x.id !== id) })),

      addService: () =>
        set((s) => ({
          services: [
            ...s.services,
            {
              id: makeId('sv_'),
              icon: 'Аренда',
              title: 'Новая услуга',
              kicker: '',
              body: '',
              active: false,
              open: false,
            },
          ],
        })),
      patchService: (id, patch) => set((s) => ({ services: patchById(s.services, id, patch) })),
      setOpenService: (id) =>
        set((s) => ({ services: s.services.map((x) => ({ ...x, open: x.id === id })) })),
      reorderServices: (from, to) => set((s) => ({ services: moveItem(s.services, from, to) })),
      removeService: (id) => set((s) => ({ services: s.services.filter((x) => x.id !== id) })),

      addColor: () =>
        set((s) => ({
          palette: [...s.palette, { id: makeId('pc_'), name: 'Новый цвет', hex: '#D8CCBB' }],
        })),
      patchColor: (id, patch) => set((s) => ({ palette: patchById(s.palette, id, patch) })),
      removeColor: (id) => set((s) => ({ palette: s.palette.filter((x) => x.id !== id) })),
    }),
    { name: 'bridal-store-settings', version: 1 },
  ),
);
