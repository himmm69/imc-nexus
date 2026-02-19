export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'student' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'student' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'student' | 'admin'
          created_at?: string
        }
      }
      topics: {
        Row: {
          id: number
          name: string
          parent_topic_id: number | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          parent_topic_id?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          parent_topic_id?: number | null
          created_at?: string
        }
      }
      papers: {
        Row: {
          id: number
          title: string
          topic_id: number
          year: number | null
          course: string | null
          uploader_id: string
          file_path: string
          mime_type: string | null
          size_bytes: number | null
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          topic_id: number
          year?: number | null
          course?: string | null
          uploader_id: string
          file_path: string
          mime_type?: string | null
          size_bytes?: number | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          topic_id?: number
          year?: number | null
          course?: string | null
          uploader_id?: string
          file_path?: string
          mime_type?: string | null
          size_bytes?: number | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
