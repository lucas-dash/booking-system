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
      guests: {
        Row: {
          created_at: string
          email: string
          first_name: string
          guest_id: string
          last_name: string
          phone_number: number
        }
        Insert: {
          created_at?: string
          email?: string
          first_name?: string
          guest_id?: string
          last_name?: string
          phone_number: number
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          guest_id?: string
          last_name?: string
          phone_number?: number
        }
        Relationships: []
      }
      reservations: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guest_id: string
          guests_count: number
          reservation_id: string
          room_id: string
          status: string
          total_price: number
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guest_id: string
          guests_count?: number
          reservation_id?: string
          room_id: string
          status?: string
          total_price?: number
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guest_id?: string
          guests_count?: number
          reservation_id?: string
          room_id?: string
          status?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "reservations_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["guest_id"]
          },
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["room_id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          guest_id: string
          rating: number
          review_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          guest_id: string
          rating: number
          review_id?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          guest_id?: string
          rating?: number
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["guest_id"]
          }
        ]
      }
      rooms: {
        Row: {
          availbility: boolean
          created_at: string
          info: string
          price_per_day: number
          room_id: string
          room_number: number
          room_type: string
        }
        Insert: {
          availbility: boolean
          created_at?: string
          info?: string
          price_per_day: number
          room_id?: string
          room_number: number
          room_type?: string
        }
        Update: {
          availbility?: boolean
          created_at?: string
          info?: string
          price_per_day?: number
          room_id?: string
          room_number?: number
          room_type?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
