// frConfigurationDeBaseTailwindPourLeProjet
// enBasicTailwindConfigurationForTheProject

import type { Config } from "tailwindcss";

const config: Config = {
  // frFichiersAnalyseParTailwindPourGenererLesClasses
  // enFilesScannedByTailwindToGenerateClasses
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // frZonePourEtendreLeThemePlusTardCouleursTypographies
      // enAreaToExtendThemeLaterColorsTypography
    },
  },
  plugins: [],
};

export default config;
