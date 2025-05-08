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
                    <BulletSection number={2} text={"... classify your names using a .csv file upload or via API. If you choose the file upload just put all your names under one column and you are good to go. For using the API please refere to our documentation."}/>
                    <BulletSection number={3} text={"... retrieve only the most likely ethnicity per name or get the probability distribution for all ethnicities per name."}/>
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
                        With N2E, you can also request custom models tailored to specific origins on the ‘Model Hub’ page. You are able select the desired origins (including 'else' for unselected ones) and even origin groups.
                    </Text>
                    <Text
                        color="textLight"
                        fontSize="xs"
                        textAlign="justify"
                    >
                        While creating a custom model keep in mind that ...
                    </Text>

                    <BulletSection number={1} text={"... ethnicity estimation is probabilistic and its performance highly dependent on the amount and kind of ethnicities. Compare your origin configuration with those of our already trained models to estimate how good your model might perform."}/>
                    <BulletSection number={2} text={"... English speaking origins have similar names. Therefore, they will be mixed up by the classifier more often. The same principle can apply to other origins."}/>
                    <BulletSection number={3} text={".... machine learning is prone to bias. To reduce bias, we balance training data across chosen origins. That means, we limit the amount of names of each selected origin to match the amount of names of the origin with the least occurences in our dataset. During model creation we will inform you with according numbers."}/>

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
