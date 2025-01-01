import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await res.json();
          if (res.ok && data) {
            const { _id: id, ...rest } = data.user;
            return {
              token: {
                access_token: data.accessToken,
                refresh_token: data.refreshToken,
              },
              id,
              ...rest,
            };
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Error signing in with credentials", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && user && account.provider !== "credentials") {
        try {
          const body = {
            accessToken: account.access_token!,
            idToken: account.id_token!,
            provider: account.provider!,
            profile,
          };
          const response = await fetch(
            `${process.env.BACKEND_URL}/auth/${account.provider}/callback`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(body),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to sign in with Google");
          }
          const data = await response.json();

          user.id = data.user._id;
          user.username = data.user.username;
          user.avatar = data.user.avatar;
          user.email = data.user.email;
          user.token = {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
          };
          user.vocabList = data.user.vocabList;
          return true;
        } catch (error) {
          console.error("Error signing in with Google", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          user: {
            ...token.user,
            ...session.user,
          },
        };
      }
      if (user) {
        token.accessToken = user.token!.access_token;
        token.refreshToken = user.token!.refresh_token;
        token.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          vocabList: user.vocabList,
        };
        return token;
      }

      //TODO: fix calling refresh token multiple times
      const decodedAccessToken = jwtDecode(token.accessToken);
      if (decodedAccessToken.exp! > Date.now() / 1000) {
        return token;
      }
      console.log("Refresh token");
      if (!token.refreshToken) {
        throw new TypeError("Missing refresh_token");
      }
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw data;
        token.accessToken = data.access_token;
        if (data.refresh_token) token.refreshToken = data.refresh_token;
        return token;
      } catch (error) {
        console.error("Error refreshing access token", error);
        return {
          ...token,
          error: "RefreshTokenError",
        };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        id: token.user.id!,
        email: token.user.email!,
        username: token.user.username,
        avatar: token.user.avatar,
        vocabList: token.user.vocabList,
        isAdmin: token.user.isAdmin,
        emailVerified: new Date(),
      };
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },
});
