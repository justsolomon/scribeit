import { Heading, HStack } from '@chakra-ui/react';

const Header = () => {
  return (
    <HStack align="center" borderBottom="1px" h="50px" px={4}>
      <Heading size="md">ScribeIt!</Heading>
    </HStack>
  );
};

export default Header;
