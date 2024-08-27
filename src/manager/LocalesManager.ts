import path from "node:path";
import fs from "node:fs";
import { log } from "node:console";
import { Locale } from "../types/locale";

class LocalesManager {
    public readonly defaultLocale: string;
    private locales: Record<string, Locale> = {};

    constructor(defaultLocale: string) {
        this.defaultLocale = defaultLocale;
        this.loadLocales();
    }

    loadLocales() {
        const localesDir = path.join(__dirname, "..", "locales");
        const localesFiles = fs.readdirSync(localesDir).filter(file => file.endsWith(".json"));

        localesFiles.forEach(file => {
            log("Loading " + file.split(".")[0] + "...")

            const locale = file.split("-")[0];
            const fp = path.join(localesDir, file);
            this.locales[locale] = require(fp);
        });
    }

    getTranslation(locale: string, key: string) {
        if (!this.locales[locale])
            locale = this.defaultLocale;

        return this.locales[locale][key] || this.locales[this.defaultLocale][key] || key;
    }
}

export = new LocalesManager("en");