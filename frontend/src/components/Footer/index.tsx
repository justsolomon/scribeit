import { HStack, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <HStack align="center" justify="flex-end" borderTop="1px" h="50px" px={4}>
      <Text>
        Made with ❤️ by{' '}
        <Link href="https://justsolomon.tech" target="_blank" color="blue.500">
          Gbolahan
        </Link>
      </Text>
    </HStack>
  );
};

export default Footer;
