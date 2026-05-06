import { content } from '../content';

function EdadRestringida() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <section className="flex max-w-md flex-col items-center gap-6 text-center">
        <img
          src={content.ageRestriction.logoSrc}
          alt={content.ageRestriction.logoAlt}
          className="h-auto w-full max-w-xs object-contain"
        />
        <p className="text-lg font-medium leading-8 text-slate-100 sm:text-xl">{content.ageRestriction.message}</p>
      </section>
    </main>
  );
}

export default EdadRestringida;