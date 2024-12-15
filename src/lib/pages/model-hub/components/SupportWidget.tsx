import { Button, HStack, Heading, Text, VStack, Image, Link } from "@chakra-ui/react";
import { BiSolidDonateHeart } from "react-icons/bi";

const SupportWidget = () => {
  return (
    <VStack
        alignItems="flex-start"
        bg="#ffffcc"
        borderRadius="7"
        padding="4"
        gap="4"
        marginX="auto"
        maxWidth={{ base: "full", lg: "600" }}
        boxShadow="lg"
    >
        <HStack>
            <BiSolidDonateHeart color="var(--chakra-colors-textDark)" size="35" />
            <Heading variant="h2" color="textDark">Support us</Heading>
        </HStack>

        <Text color="textDark">N2E is a free, open-source project which means we cover server and maintainance fees ourselves. If you find N2E useful and would like to support us, consider donating. </Text>
    
        <Link href="https://buymeacoffee.com/theodorpfr" target="_blank">
            <Button
                bg="#FFDD00"
                gap="3"
                _hover={{
                    bg: "#ffe74d"
                }}
            >
                <Image src="public/assets/bmc-logo.svg" height="25px" />
                <Text color="textDark">Buy Me a Coffee</Text>
            </Button>
        </Link>
    </VStack>
 
  );
};

export default SupportWidget;
