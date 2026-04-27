'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { autoTranslate } from '@/utils/translate'

// --- BLOG ACTIONS ---
export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const title_en = formData.get('title_en') as string || await autoTranslate(title)
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  const slug_en = title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const excerpt = formData.get('excerpt') as string
  const excerpt_en = formData.get('excerpt_en') as string || await autoTranslate(excerpt)

  const content = formData.get('content') as string
  const content_en = formData.get('content_en') as string || await autoTranslate(content)

  const { error } = await supabase.from('posts').insert({
    title,
    title_en,
    slug,
    slug_en,
    excerpt,
    excerpt_en,
    content,
    content_en,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'on',
    is_pinned: formData.get('is_pinned') === 'on',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/blog')
  revalidatePath('/makaleler') // Frontend blog path
  revalidatePath('/en/makaleler')
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
  const title_en = formData.get('title_en') as string || await autoTranslate(title)
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  const slug_en = title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  
  const short_desc = formData.get('short_desc') as string
  const short_desc_en = formData.get('short_desc_en') as string || await autoTranslate(short_desc)

  const content = formData.get('content') as string
  const content_en = formData.get('content_en') as string || await autoTranslate(content)

  const { error } = await supabase.from('services').insert({
    title,
    title_en,
    slug,
    slug_en,
    short_desc,
    short_desc_en,
    content,
    content_en,
    icon: formData.get('icon') as string || 'Activity',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/services')
  revalidatePath('/uzmanliklar')
  revalidatePath('/en/uzmanliklar')
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
  
  const content = formData.get('content') as string
  const content_en = formData.get('content_en') as string || await autoTranslate(content)

  const { error } = await supabase
    .from('settings')
    .update({ 
      content,
      content_en,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'about_me')

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/about')
  revalidatePath('/hakkimda')
  revalidatePath('/en/hakkimda')
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

  const title = formData.get('title') as string
  const title_en = formData.get('title_en') as string || await autoTranslate(title)

  const { error } = await supabase.from('videos').insert({
    title,
    title_en,
    youtube_url: youtube_url,
    is_pinned: formData.get('is_pinned') === 'on',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/videos')
  revalidatePath('/videolar')
  revalidatePath('/en/videolar')
  revalidatePath('/')
  revalidatePath('/en')
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/videos')
  revalidatePath('/videolar')
  revalidatePath('/')
}

// --- GALLERY ACTIONS ---
export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient()
  
  const files = formData.getAll('images') as File[]
  const title = formData.get('title') as string
  const category = formData.get('category') as string || 'Genel'
  const album_name = formData.get('album_name') as string || 'Genel Vaka'

  if (!files || files.length === 0 || files[0].size === 0) {
    throw new Error("Lütfen en az bir fotoğraf seçin.")
  }

  // Her bir dosya için yükleme ve veritabanı kayıt işlemi yap
  for (const file of files) {
    if (file.size === 0) continue;

    // Dosya adını benzersiz yapalım
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

    // 1. Fotoğrafı Supabase Storage'a yükle
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file)

    if (uploadError) throw new Error(uploadError.message)

    // 2. Yüklenen fotoğrafın herkese açık linkini al
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName)

    // 3. Veritabanına kaydet
    const title_en = formData.get('title_en') as string || await autoTranslate(title)
    const album_name_en = formData.get('album_name_en') as string || await autoTranslate(album_name)

    const { error } = await supabase.from('gallery').insert({
      title,
      title_en,
      image_url: publicUrl,
      category,
      album_name,
      album_name_en,
      is_pinned: formData.get('is_pinned') === 'on',
    })

    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
  revalidatePath('/en/galeri')
  revalidatePath('/')
  revalidatePath('/en')
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
  revalidatePath('/')
}

export async function deleteAlbum(albumName: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('gallery').delete().eq('album_name', albumName)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
  revalidatePath('/')
}

export async function togglePostPin(id: string, currentState: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').update({ is_pinned: !currentState }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/blog')
  revalidatePath('/makaleler')
  revalidatePath('/')
}

export async function toggleVideoPin(id: string, currentState: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('videos').update({ is_pinned: !currentState }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/videos')
  revalidatePath('/videolar')
  revalidatePath('/')
}

export async function toggleAlbumPin(albumName: string, currentState: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('gallery').update({ is_pinned: !currentState }).eq('album_name', albumName)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/dashboard/gallery')
  revalidatePath('/galeri')
  revalidatePath('/')
}

