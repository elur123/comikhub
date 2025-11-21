export interface NewMangaChapter {
  chapter: string
  url: string
  slug: string
  chapter_slug: string
}

export interface Manga {
  title: string
  url: string
  slug: string
  ratings: number
  thumbnail: string
  new_chapters: NewMangaChapter[]
}

export interface MangaResponse {
  status: string
  data: Manga[]
  status_code: number
}

export interface Chapter {
  title: string
  url: string
  slug: string
}

export interface MangaDetail {
  thumbnail: string
  title: string
  description: string
  ratings: number
  status: string
  slug: string
  chapters: Chapter[]
}

export interface MangaDetailResponse {
  status: string
  data: MangaDetail
  status_code: number
}
