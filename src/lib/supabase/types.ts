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
      projects: {
        Row: {
          id: string
          name: string
          description: string
          logo: string
          banner_image: string
          token_symbol: string
          token_price: number
          total_raise: number
          progress: number
          start_time: string
          end_time: string
          status: 'upcoming' | 'live' | 'ended'
          min_investment: number
          max_investment: number
          total_supply: number
          initial_market_cap: number
          vesting_schedule: string
          refund_policy: string
          socials: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          logo: string
          banner_image: string
          token_symbol: string
          token_price: number
          total_raise: number
          progress?: number
          start_time: string
          end_time: string
          status: 'upcoming' | 'live' | 'ended'
          min_investment: number
          max_investment: number
          total_supply: number
          initial_market_cap: number
          vesting_schedule: string
          refund_policy: string
          socials: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          logo?: string
          banner_image?: string
          token_symbol?: string
          token_price?: number
          total_raise?: number
          progress?: number
          start_time?: string
          end_time?: string
          status?: 'upcoming' | 'live' | 'ended'
          min_investment?: number
          max_investment?: number
          total_supply?: number
          initial_market_cap?: number
          vesting_schedule?: string
          refund_policy?: string
          socials?: Json
          updated_at?: string
        }
      }
    }
  }
}