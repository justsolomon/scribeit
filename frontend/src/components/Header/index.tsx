import { Heading, HStack } from '@chakra-ui/react';

const Header = () => {
  return (
    <HStack
      h="60px"
      px={6}
      align="center"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="md"
    >
      <Heading fontSize="24px">ScribeIt!</Heading>
    </HStack>
  );
};

export default Header;
