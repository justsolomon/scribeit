import { Box } from '@chakra-ui/react';
import Footer from 'components/Footer';
import Header from 'components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />

      <Box as="main" h="calc(100vh - 120px)" py={8} px={16} overflow="auto">
        {children}
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
