import { services } from '../src/data/services';
import fs from 'fs';

async function translateText(text: string) {
  if (!text) return '';
  try {
    const translate = (await import('google-translate-api-x')).default;
    const res = await translate(text, { to: 'en' });
    return res.text.replace(/'/g, "''");
  } catch (error) {
    console.error("Translation failed:", error);
    return text.replace(/'/g, "''");
  }
}

async function migrate() {
  let sql = 'INSERT INTO services (slug, slug_en, title, title_en, short_desc, short_desc_en, content, content_en, icon) VALUES\n';
  
  const values = [];
  for (const s of services) {
    console.log(`Processing: ${s.title}`);
    
    const title_en = await translateText(s.title);
    const short_desc_en = await translateText(s.shortDesc);
    const content_en = await translateText(s.content);
    const slug_en = title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    values.push(`('${s.id}', '${slug_en}', '${s.title.replace(/'/g, "''")}', '${title_en}', '${s.shortDesc.replace(/'/g, "''")}', '${short_desc_en}', '${s.content.replace(/'/g, "''")}', '${content_en}', '${s.icon}')`);
  }
  
  sql += values.join(',\n') + ' ON CONFLICT (slug) DO NOTHING;';
  fs.writeFileSync('services_migration.sql', sql);
  console.log("Migration SQL generated in services_migration.sql");
}

migrate();
