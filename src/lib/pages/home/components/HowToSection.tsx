import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Box, Text, VStack, Heading, Image, Link, HStack, Button } from "@chakra-ui/react";


interface BulletSectionProps {
    number: number;
    text: string
}


const BulletSection = (props: BulletSectionProps) => {
    return (
        <HStack
            gap="3"
            align="flex-start"
            marginY="3"
            maxWidth={{ base: "none", sm: "75%", lg: "none" }}
            marginX="auto"
            width="full"
        >
            <Flex
                backgroundColor="secondaryBlue.100"
                borderRadius="full"
                align="center"
                justifyContent="center"
                minWidth="30px"
                minHeight="30px"
            >
                <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="primaryBlue.100"
                >
                    {props.number}
                </Text>
            </Flex>
            <Text
                flex="5"
                color="textLight"
                fontSize="xs"
                textAlign="justify"
            >
                {props.text}
            </Text>
        </HStack>
    )
}



const HowToSection = () => {

    return (
        <VStack gap="10">
            <Flex
                flexDirection={{ base: "column", lg: "row" }}
            >
                <VStack
                    borderRightWidth={{ base: "0px", lg: "1px" }}
                    borderColor="lightGray"
                    paddingRight={{ base: "0", lg: "20" }}
                    paddingBottom={{ base: "7", lg: "0" }}
                    align="left"
                    gap="3"
                    flex="1"
                >
                    <Heading
                        variant="h3"
                    >
                        ... classify names
                    </Heading>

                    <Text
                        color="textLight"
                        fontSize="xs"
                        textAlign="justify"
                    >
                        On the 'Model Hub' page you can access our pretrained and your custom models. For every trained model, we display the overall accuracy as well as individual accuracies for each origin. Classifying is very straight-forward, but of course we give you options.
                    </Text>

                    <Text
                        color="textLight"
                        fontSize="xs"
                        textAlign="justify"
                    >
                        You can choose to...
                    </Text>

                    <BulletSection number={1} text={"... either use one of our already trained models or, if none fit your usecase, request a custom model trained on just the ethnicities you need."}/>
                    <BulletSection number={2} text={"... classify your names using a .csv file upload or via API. If you choose the file upload just put all your names under one column and you are good to go. For using the API please refer to our documentation."}/>
                    <BulletSection number={3} text={"... retrieve only the most likely ethnicity per name or get the full probability distribution across all ethnicities for each name."}/>
                    <BulletSection number={4} text={"... classify names by specific nationalities or broader origin groups (e.g. 'asian' or 'scandinavian')."}/>
                </VStack>

                <VStack
                    align="left"
                    paddingLeft={{ base: "0", lg: "20" }}
                    flex="1"
                    gap="3"
                >
                    <Heading
                        variant="h3"
                    >
                        ... request custom models
                    </Heading>

                    <Text
                        color="textLight"
                        fontSize="xs"
                        textAlign="justify"
                    >
                        With N2E, you can also request custom models tailored to specific origins on the ‘Model Hub’ page. You can select the desired origins (including 'else' for unselected ones) and even origin groups.
                    </Text>
                    <Text
                        color="textLight"
                        fontSize="xs"
                        textAlign="justify"
                    >
                        While creating a custom model, keep in mind that...
                    </Text>

                    <BulletSection number={1} text={"... ethnicity estimation is probabilistic, and its performance is highly dependent on the number and type of selected origins. Compare your origin configuration with those of our already trained models to estimate how well your model might perform."}/>
                    <BulletSection number={2} text={"... English-speaking origins often share similar names, so the classifier is more likely to confuse them. The same principle can apply to other origins."}/>
                    <BulletSection number={3} text={"... machine learning is prone to bias. To reduce it, we balance the training data across the chosen origins. This means we limit the number of names per selected origin to match the origin with the fewest entries in our dataset. During model creation, we’ll inform you with the corresponding numbers."}/>
                </VStack>
            </Flex>

            <Button
                variant="secondary"
                marginX="auto"
                rightIcon={<ArrowForwardIcon color="primaryBlue.100" />}
                onClick={() => window.location.href = "/model-hub" }
                >
                Ready? Let's classify!
            </Button>

        </VStack>
    );
};

export default HowToSection;
