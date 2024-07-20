import { HStack, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <HStack
      h="60px"
      px={6}
      align="center"
      justify="flex-end"
      borderTop="1px"
      borderColor="gray.300"
    >
      <Text fontSize="18px">
        Made with ❤️ by{' '}
        <Link href="https://justsolomon.tech" target="_blank" color="blue.500">
          Gbolahan
        </Link>
      </Text>
    </HStack>
  );
};

export default Footer;
