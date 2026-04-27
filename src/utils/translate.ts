import translate from 'google-translate-api-x';

export async function autoTranslate(text: string | null | undefined): Promise<string> {
  if (!text) return '';
  try {
    const res = await translate(text, { to: 'en' });
    return res.text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text; // Çeviri başarısız olursa orijinal metni döndür
  }
}
