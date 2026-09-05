import { CusTable, CusTableHead, CusTableRow } from '@/components/ui';
import { SIZE_GRID } from '@/constants/catalog';
import {
  ACC_FIELDS,
  BASE_FIELDS,
  DRESS_FIELDS,
  DTO_LIST,
  EMPTY_STATES,
  JSON_SAMPLE,
  RELATED_LIST,
  VALIDATION_RULES,
} from '@/features/schema/schema.data';
import type { SchemaNote, SchemaRow } from '@/features/schema/types';

const FIELD_COLS = 'minmax(0,1.1fr) minmax(0,1.6fr) 80px minmax(0,1fr)';
const FIELD_COLS_WHERE = 'minmax(0,1.1fr) minmax(0,1.5fr) 80px minmax(0,1fr) minmax(0,1fr)';

function FieldTable({ rows, withWhere }: { rows: readonly SchemaRow[]; withWhere?: boolean }) {
  const cols = withWhere ? FIELD_COLS_WHERE : FIELD_COLS;

  return (
    <CusTable>
      <CusTableHead cols={cols}>
        <div>Поле</div>
        <div>Тип</div>
        <div>Обяз.</div>
        <div>Контрол</div>
        {withWhere && <div>Где видно</div>}
      </CusTableHead>

      {rows.map((r) => (
        <CusTableRow key={r.name} cols={cols}>
          <div className="truncate font-medium">{r.name}</div>
          <div className="truncate text-mini text-muted">{r.type}</div>
          <div className="text-mini text-subtle">{r.req}</div>
          <div className="truncate text-mini text-subtle">{r.control}</div>
          {withWhere && <div className="truncate text-mini text-subtle">{r.where}</div>}
        </CusTableRow>
      ))}
    </CusTable>
  );
}

function NoteList({ notes }: { notes: readonly SchemaNote[] }) {
  return (
    <div className="flex flex-col gap-2">
      {notes.map((n) => (
        <div key={n.name} className="rounded-sm border border-border bg-surface p-3">
          <div className="text-body font-medium">{n.name}</div>
          <div className="mt-0.5 text-mini text-muted">{n.body}</div>
        </div>
      ))}
    </div>
  );
}

const SIZE_COLS = 'repeat(4, minmax(0,1fr))';

/** Ma'lumot modeli hujjati — dasturchilar uchun ma'lumotnoma sahifasi */
export default function FeatureSchema() {
  return (
    <div className="max-w-5xl">
      <h1 className="mb-1 font-serif text-[32px] leading-tight">Схема данных</h1>
      <p className="mb-7 text-muted">
        Справочник полей, правил валидации и DTO. Используется при подключении API.
      </p>

      <h2 className="mb-3 font-serif text-[22px]">Общие поля</h2>
      <FieldTable rows={BASE_FIELDS} withWhere />

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Платья</h2>
      <FieldTable rows={DRESS_FIELDS} />

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Аксессуары</h2>
      <FieldTable rows={ACC_FIELDS} />

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Размерная сетка RU</h2>
      <CusTable>
        <CusTableHead cols={SIZE_COLS}>
          <div>Размер</div>
          <div>Грудь</div>
          <div>Талия</div>
          <div>Бёдра</div>
        </CusTableHead>
        {SIZE_GRID.map((s) => (
          <CusTableRow key={s.ru} cols={SIZE_COLS}>
            <div className="font-medium">{s.label}</div>
            <div>{s.bust}</div>
            <div>{s.waist}</div>
            <div>{s.hips}</div>
          </CusTableRow>
        ))}
      </CusTable>

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Правила валидации</h2>
      <CusTable>
        {VALIDATION_RULES.map((r) => (
          <CusTableRow key={r.n} cols="40px minmax(0,1fr) minmax(0,2fr)">
            <div className="text-mini text-subtle">{r.n}</div>
            <div className="truncate font-medium">{r.field}</div>
            <div className="truncate text-mini text-muted">{r.msg}</div>
          </CusTableRow>
        ))}
      </CusTable>

      <div className="mt-7 grid grid-cols-2 gap-5">
        <div>
          <h2 className="mb-3 font-serif text-[22px]">DTO</h2>
          <NoteList notes={DTO_LIST} />
        </div>
        <div>
          <h2 className="mb-3 font-serif text-[22px]">Связанные сущности</h2>
          <NoteList notes={RELATED_LIST} />
        </div>
      </div>

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Пустые состояния</h2>
      <NoteList notes={EMPTY_STATES} />

      <h2 className="mb-3 mt-7 font-serif text-[22px]">Пример JSON</h2>
      <pre className="overflow-x-auto rounded-sm border border-border bg-background p-4 text-mini text-muted">
        {JSON_SAMPLE}
      </pre>
    </div>
  );
}
