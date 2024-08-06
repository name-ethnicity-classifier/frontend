import { Grid, Heading, Text } from '@chakra-ui/react';

const SomeText = () => {
  return (
    <Grid textAlign="center" gap={2}>
      <Heading fontSize="2xl" fontWeight="extrabold">
        TODO 123
      </Heading>
      <Text fontSize="sm">
        TODO create app!
      </Text>
    </Grid>
  );
};

export default SomeText;
