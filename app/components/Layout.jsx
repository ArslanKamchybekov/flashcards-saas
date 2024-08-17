'use client';
import { AppBar, Toolbar, Box, Button, Link } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#1E1E1E'}}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Link
            variant="h6"
            sx={{
              color: '#00B8D4',
              flexGrow: 1,
              fontFamily: poppins.style.fontFamily,
              fontWeight: 800,
              textDecoration: 'none',
            }}
            href="/"
          >
            Flashify
          </Link>
          <SignedOut>
            <Button
              sx={{
                color: '#ffffff',
                borderColor: '#00B8D4',
                marginRight: 1,
                fontFamily: poppins.style.fontFamily,
                fontWeight: 600,
              }}
              href="/sign-in"
            >
              Sign In
            </Button>
            <Button
              sx={{
                color: '#00B8D4',
                borderColor: '#00B8D4',
                fontFamily: poppins.style.fontFamily,
                fontWeight: 600,
              }}
              href="/sign-up"
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Button
                sx={{
                  color: '#ffffff',
                  borderColor: '#eeeeee',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 600,
                }}
                href="/pricing"
              >
                Upgrade
              </Button>
              <Button
                sx={{
                  color: '#ffffff',
                  borderColor: '#00B8D4',
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 600,
                }}
                href="/generate"
              >
                Generate
              </Button>
              <UserButton />
            </Box>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <Box component="main">{children}</Box>
    </>
  );
};

export default Layout;
