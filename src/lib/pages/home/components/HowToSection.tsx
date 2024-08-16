import { Flex, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ArrowForwardIcon, InfoIcon } from "@chakra-ui/icons";
import CountUp from "react-countup";

import PrimaryButton from "~/lib/components/PrimaryButton";


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
                backgroundColor="secondaryBlue"
                borderRadius="full"
                align="center"
                justifyContent="center"
                minWidth="30px"
                minHeight="30px"
            >
                <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color="primaryBlue"
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
        <Flex
            flexDirection={{ base: "column", lg: "row" }}
        >
            <VStack
                borderRightWidth={{ base: "0px", lg: "1px" }}
                borderColor="lightGray"
                paddingRight={{ base: "0", lg: "20" }}
                paddingBottom={{ base: "5", lg: "0" }}
                align="left"
                gap="3"
                flex="1"
            >
                <Text
                    color="textDark"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    ... classify names
                </Text>

                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    On the 'Model Hub' page you can access our pretrained and your custom models. For every trained model, we display the overall accuracy as well as individual accuracies for each nationalities.
                </Text>

                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    To classify names, you upload them in a .csv file in the following format:
                </Text>
                
                <Box
                    maxWidth="75%"
                    marginX="auto"
                    marginY="3"
                    borderWidth="1px"
                    borderColor="secondaryBlue"
                    borderRadius="7px"
                >
                    <Image
                        src="/assets/input-example-csv.png"
                    />
                </Box>

                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    After your file has been classified, you will be able to download a new .csv file containing the ethnicity predictions:
                </Text>

                <Box
                    maxWidth="75%"
                    marginX="auto"
                    marginY="3"
                    borderWidth="1px"
                    borderColor="secondaryBlue"
                    borderRadius="7px"
                >
                    <Image
                        src="/assets/output-example-csv.png"
                    />
                </Box>

                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    Alternatively, you can use our API. If due to efficiency or data privacy reasons you need to classify your names locally on your machine, you can send us an email with your inquiry.
                </Text>

            </VStack>

            <VStack
                align="left"
                paddingLeft={{ base: "0", lg: "20" }}
                flex="1"
                gap="3"
            >
                <Text
                    color="textDark"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    ... request custom models
                </Text>
                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    With N2E, you can also request custom models tailored to specific nationalities on the ‘Model Hub’ page. You are able select the desired nationalities (including 'else' for unselected ones) and even nationality groups.
                </Text>
                <Text
                    color="textLight"
                    fontSize="xs"
                    textAlign="justify"
                >
                    While creating a custom model keep in mind that ...
                </Text>

                <BulletSection number={1} text={"... ethnicity estimation is probabilistic and its performance highly dependent on the amount and kind of ethnicities. Compare your nationality configuration with those of our pre-trained models to estimate how good your model might perform."}/>
                <BulletSection number={2} text={"... English speaking nationalities have similar names. Therefore, they will be mixed up by the classifier more often. The same principle can apply to other nationalities."}/>
                <BulletSection number={3} text={".... machine learning is prone to bias. To reduce bias, we balance training data across chosen nationalities. If one nationality has fewer occurrences of names in our dataset, we limit others to match, which may lower overall accuracy. During model creation we will inform you with according numbers."}/>

            </VStack>
        </Flex>
    );
};

export default HowToSection;
