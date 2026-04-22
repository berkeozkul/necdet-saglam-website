'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// --- BLOG ACTIONS ---
export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const { error } = await supabase.from('posts').insert({
    title,
    slug,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'on',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/blog')
  revalidatePath('/makaleler') // Frontend blog path
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/blog')
  revalidatePath('/makaleler')
}

// --- SERVICES ACTIONS ---
export async function createService(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const { error } = await supabase.from('services').insert({
    title,
    slug,
    short_desc: formData.get('short_desc') as string,
    content: formData.get('content') as string,
    icon: formData.get('icon') as string || 'Activity',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/services')
  revalidatePath('/uzmanliklar')
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/services')
  revalidatePath('/uzmanliklar')
}

// --- ABOUT ACTIONS ---
export async function updateAbout(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('settings')
    .update({ 
      content: formData.get('content') as string,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'about_me')

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/about')
  revalidatePath('/hakkimda')
}

// --- VIDEO ACTIONS ---
export async function createVideo(formData: FormData) {
  const supabase = await createClient()
  
  let youtube_url = formData.get('youtube_url') as string
  
  // YouTube linkinden sadece Video ID'sini çıkarma (Hem standart hem de kısaltılmış youtu.be linkleri için)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = youtube_url.match(regExp);

  if (match && match[2].length === 11) {
    youtube_url = match[2]; // Sadece 11 haneli ID'yi kaydet
  } else {
    throw new Error("Lütfen geçerli bir YouTube linki girin.");
  }

  const { error } = await supabase.from('videos').insert({
    title: formData.get('title') as string,
    youtube_url: youtube_url,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/videos')
  revalidatePath('/videolar')
  revalidatePath('/')
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/videos')
  revalidatePath('/videolar')
  revalidatePath('/')
}

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient()
  
  const file = formData.get('image') as File
  const title = formData.get('title') as string
  const category = formData.get('category') as string || 'Genel'
  const album_name = formData.get('album_name') as string || 'Genel Vaka'

  if (!file || file.size === 0) {
    throw new Error("Lütfen bir fotoğraf seçin.")
  }

  // Dosya adını benzersiz yapalım (Türkçe karakterleri ve boşlukları temizleyelim)
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

  // 1. Fotoğrafı Supabase Storage'a yükle
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, file)

  if (uploadError) throw new Error(uploadError.message)

  // 2. Yüklenen fotoğrafın herkese açık linkini al
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(fileName)

  // 3. Veritabanına kaydet
  const { error } = await supabase.from('gallery').insert({
    title,
    image_url: publicUrl,
    category,
    album_name
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
  revalidatePath('/')
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
}

