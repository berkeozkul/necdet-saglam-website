'use client';

import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { sendContactEmail } from "@/app/actions/contact";

export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(locale === 'tr' ? 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' : 'An error occurred, please try again later.');
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 border border-green-200 py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-3xl font-bold font-heading">{locale === 'tr' ? 'Mesajınız Gönderildi!' : 'Message Sent!'}</h3>
        <p className="text-green-700/90 text-lg max-w-sm mx-auto">
          {locale === 'tr' ? 'İletişim formunuz başarıyla bize ulaştı. En kısa sürede size dönüş yapacağız.' : 'Your contact form has been successfully received. We will get back to you as soon as possible.'}
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md"
        >
          {locale === 'tr' ? 'Yeni Mesaj Gönder' : 'Send New Message'}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-primary">{locale === 'tr' ? 'Adınız' : 'First Name'}</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
            placeholder={locale === 'tr' ? 'Örn: Ahmet' : 'Ex: John'}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-primary">{locale === 'tr' ? 'Soyadınız' : 'Last Name'}</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
            placeholder={locale === 'tr' ? 'Örn: Yılmaz' : 'Ex: Doe'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-primary">{t("formPhone")}</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          required
          className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
          placeholder="05XX XXX XX XX"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-primary">{t("formSubject")}</label>
        <select 
          id="subject" 
          name="subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none appearance-none"
        >
          <option value="">{locale === 'tr' ? 'Seçiniz...' : 'Select...'}</option>
          <option value="randevu">{locale === 'tr' ? 'Randevu Talebi' : 'Appointment Request'}</option>
          <option value="bilgi">{locale === 'tr' ? 'Bilgi Alma' : 'Information'}</option>
          <option value="diger">{locale === 'tr' ? 'Diğer' : 'Other'}</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-primary">{t("formMessage")}</label>
        <textarea 
          id="message" 
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl bg-accent border-transparent focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
          placeholder={locale === 'tr' ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help you?'}
        ></textarea>
      </div>

      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          id="kvkk" 
          name="kvkk"
          required
          className="mt-1 w-4 h-4 text-secondary bg-accent border-gray-300 rounded focus:ring-secondary"
        />
        <label htmlFor="kvkk" className="text-xs text-foreground/60 leading-relaxed">
          {t("formTerms")}
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            {locale === 'tr' ? 'Gönderiliyor...' : 'Sending...'}
            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
          </>
        ) : (
          <>
            {t("formSubmit")}
            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
