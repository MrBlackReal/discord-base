import path from "node:path";
import fs from "node:fs";
import { Locale } from "../types/locale";

class LocalesManager {
    public readonly defaultLocale: string;
    private locales: Record<string, Locale> = {};

    constructor(defaultLocale: string) {
        this.defaultLocale = defaultLocale;
        this.loadLocales();
    }

    private loadLocales() {
        const localesPath = path.join(__dirname, '../locales');
        const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

        files.forEach(file => {
            const locale = file.split('-')[0];
            const filePath = path.join(localesPath, file);

            try {
                this.locales[locale] = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Locale;
            } catch (error) {
                console.error(`Invalid locale file: ${file}`);
            }
        });
    }

    public getLocale(locale: string): Locale {
        return this.locales[locale] || this.locales[this.defaultLocale];
    }
}

export = new LocalesManager("en");