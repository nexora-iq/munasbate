# Munasbate Web

Cleaned and dependency-updated Next.js App Router project.

## Runtime dependencies
- Next.js 16.3.5
- React 19.3.0
- React DOM 19.3.0
- @supabase/supabase-js 2.116.0
- Framer Motion 13.3.0
- React Icons 5.7.0
- SweetAlert2 11.26.25

## Development dependencies
- ESLint 10.10.0
- eslint-config-next 16.3.5
- Tailwind CSS 4.3.3
- @tailwindcss/postcss 4.3.3
- TypeScript 5.9.3
- @types/react 19.3.0
- @types/react-dom 19.3.0
- @types/node 22.20.3

## First setup on Windows
From the project root:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\setup-munasbate.ps1
```

Or run manually:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install
npm run typecheck
npm run lint
npm run build
```

Keep `.env.local` private and do not commit it.
