'use client';

import { motion } from 'framer-motion';

interface Props {
  topLanguages: Record<string, number>;
}

export default function LanguageCard({ topLanguages }: Props) {
  const languageEntries = Object.entries(topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const totalLanguageBytes = languageEntries.reduce(
    (sum, [, bytes]) => sum + bytes,
    0
  );

  return (
    <motion.div
      className="rounded-xl border bg-card/50 p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.15 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xs">&#123;&#125;</span>
          </span>
          <div>
            <p className="text-sm font-medium">Languages</p>
            <p className="text-xs text-muted-foreground">Top languages</p>
          </div>
        </div>
      </div>

      {languageEntries.length > 0 ? (
        <div className="mt-4 space-y-3">
          {languageEntries.map(([language, bytes]) => {
            const percentage =
              totalLanguageBytes === 0 ? 0 : (bytes / totalLanguageBytes) * 100;

            return (
              <div key={language} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>{language}</span>
                  <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No language data yet. Once you have some non empty repositories, they will show up here.
        </p>
      )}
    </motion.div>
  );
}
