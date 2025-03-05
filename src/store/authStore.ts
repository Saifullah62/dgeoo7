import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Validation schemas
const profileSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  bio: z.string().max(200).optional(),
  avatar_url: z.string().url().optional(),
  level: z.number().min(1),
  xp: z.number().min(0),
  satoshis_earned: z.number().min(0),
  missions_completed: z.number().min(0),
  achievements_unlocked: z.number().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export type Profile = z.infer<typeof profileSchema>;

interface AuthState {
  isAuthenticated: boolean;
  user: Profile | null;
  session: any;
  loading: boolean;
  error: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      session: null,
      loading: false,
      error: null,
      
      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) throw error;
          
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          
          set({
            isAuthenticated: true,
            user: profile,
            session: data.session,
            loading: false
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to sign in'
          });
        }
      },
      
      signUp: async (email: string, password: string, username: string) => {
        try {
          set({ loading: true, error: null });
          
          // Check if username is available
          const { data: existingUser } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();
          
          if (existingUser) {
            throw new Error('Username already taken');
          }
          
          // Create auth user
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { username }
            }
          });
          
          if (error) throw error;
          
          // Create profile
          const profile: Omit<Profile, 'id'> = {
            username,
            email,
            level: 1,
            xp: 0,
            satoshis_earned: 0,
            missions_completed: 0,
            achievements_unlocked: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          await supabase
            .from('profiles')
            .insert([{ ...profile, id: data.user?.id }]);
          
          set({
            isAuthenticated: true,
            user: { ...profile, id: data.user?.id },
            session: data.session,
            loading: false
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to sign up'
          });
        }
      },
      
      signOut: async () => {
        try {
          set({ loading: true, error: null });
          
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({
            isAuthenticated: false,
            user: null,
            session: null,
            loading: false
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to sign out'
          });
        }
      },
      
      updateProfile: async (data: Partial<Profile>) => {
        try {
          set({ loading: true, error: null });
          
          const user = get().user;
          if (!user) throw new Error('No user logged in');
          
          const { error } = await supabase
            .from('profiles')
            .update({
              ...data,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
          
          if (error) throw error;
          
          set(state => ({
            user: { ...state.user!, ...data },
            loading: false
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to update profile'
          });
        }
      },
      
      resetPassword: async (email: string) => {
        try {
          set({ loading: true, error: null });
          
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) throw error;
          
          set({ loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to reset password'
          });
        }
      },
      
      verifyEmail: async (token: string) => {
        try {
          set({ loading: true, error: null });
          
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email'
          });
          
          if (error) throw error;
          
          set({ loading: false });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to verify email'
          });
        }
      },
      
      refreshSession: async () => {
        try {
          set({ loading: true, error: null });
          
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          if (session) {
            // Get user profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            set({
              isAuthenticated: true,
              user: profile,
              session,
              loading: false
            });
          } else {
            set({
              isAuthenticated: false,
              user: null,
              session: null,
              loading: false
            });
          }
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to refresh session'
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        session: state.session
      })
    }
  )
);