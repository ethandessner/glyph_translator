import { GlyphTranslator } from "./components/GlyphTranslator";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black py-16">
      <main className="flex w-full max-w-6xl flex-col gap-10 px-8">
        <GlyphTranslator />
      </main>
    </div>
  );
}

