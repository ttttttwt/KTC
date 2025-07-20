/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { apiClient } from "./libraries/api-client";
import type { LoggedInUser } from "./type";

export interface AuthState {
  access_token?: string;
  refresh_token?: string;
  loggedInUser?: LoggedInUser;
  loading: boolean;
  error: any;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logOut: () => Promise<void>;
  changeAccessToken: () => Promise<void>;
  changeRefreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => {
        return {
          access_token: undefined,
          refresh_token: undefined,
          loggedInUser: undefined,
          loading: false,
          error: null,
          login: async ({ username, password }) => {
            try {
              set(
                {
                  loggedInUser: undefined,
                  access_token: undefined,
                  refresh_token: undefined,
                  error: null,
                  loading: true,
                },
                false,
                { type: "@AUTH/LOGIN/LOADING" }
              );

              const response: any = await apiClient.post("/auth/login", {
                username,
                password,
              });

              // Store user_id in localStorage for compatibility with existing code
              localStorage.setItem("user_id", String(response.loggedInUser.id));

              set(
                {
                  access_token: response.access_token,
                  refresh_token: response.refresh_token,
                  loggedInUser: response.loggedInUser,
                  loading: false,
                  error: null,
                },
                false,
                { type: "@AUTH/LOGIN/SUCCESS" }
              );
              window.location.href = "/my-tasks"; // Redirect to My Tasks after login
            } catch (error) {
              set(
                {
                  error,
                  access_token: undefined,
                  refresh_token: undefined,
                  loggedInUser: undefined,
                  loading: false,
                },
                false,
                {
                  type: "@AUTH/LOGIN/ERROR",
                }
              );
            }
          },

          logOut: async () => {
            localStorage.removeItem("user_id");
            set({
              access_token: undefined,
              refresh_token: undefined,
              loggedInUser: undefined,
            });
          },

          changeAccessToken: async () => {
            set(
              {
                access_token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNjYzMjIzLCJleHAiOjE3ODQyMjA4MjN9._SjS09sdc-BWc_7tOINhEfvfYZ2X1QvwtEyc3E8OCXX",
              },
              false,
              { type: "@AUTH/CHANGE_ACCESS_TOKEN" }
            );
          },
          changeRefreshToken: async () => {
            set(
              {
                refresh_token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUyNjYzMjIzLCJleHAiOjE3NTMyNjgwMjN9.ATl3GcFXhrr3WUb8BEPU3PdrCbDfutdUoY1P4l7w_Zd",
              },
              false,
              { type: "@AUTH/CHANGE_REFRESH_TOKEN" }
            );
          },
        };
      },
      {
        name: "auth-storage",
      }
    )
  )
);
