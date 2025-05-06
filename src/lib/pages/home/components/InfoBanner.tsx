import { Flex, Box, Text, VStack, Heading, Image, Button } from "@chakra-ui/react";

interface InfoBannerProps {
    title: string;
    description: string;
    iconUrl: string;
    onClick?: () => void;
    buttonDescription?: string;
}

const InfoBanner = (props: InfoBannerProps) => {
    const { title, description, iconUrl, onClick } = props;

    return (
        <Flex
            flexDirection={{ base: "column", lg: "row" }}
            bg="linear-gradient(to right, #ffffff 0%, rgba(255, 0, 0, 0.1) 15%, rgba(255, 0, 0, 0.1) 85%, #ffffff 100%)"
            marginX="auto"
            paddingY="10"
            paddingX={{ base: "10%", "2xl": "10%" }}
            gap="5"
            width={{ base: "100%", lg: "80%" }}
            maxWidth="1250px"
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                width={{ base: "50px", lg: "auto" }}
                flex="1"
            >
                <Image src={iconUrl} />
            </Flex>

            <VStack
                alignItems="left"
                gap="2"
                flex="5"
            >
                <Heading variant="h2" color="primaryRed.100">
                    {title}
                </Heading>

                <Text color="primaryRed.100">
                    {description}
                </Text>
                {
                    onClick && description &&
                        <Button
                            variant="cautious"
                            maxWidth="fit-content"
                            marginTop="auto"
                            onClick={onClick}
                        >
                            {props.buttonDescription || "See ethical guidelines"}
                        </Button>
                }
            </VStack>
        </Flex>
    );
};

export default InfoBanner;
