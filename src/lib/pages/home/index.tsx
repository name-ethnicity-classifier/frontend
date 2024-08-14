import { Flex, Grid, GridItem, Box, Text, VStack, Spacer, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

import PrimaryButton from "~/lib/components/PrimaryButton";
import CallToAction from "./components/CallToAction";
import LinkCard from "./components/LinkCard";
import NumberCard from "./components/NumberCard";
import TeamMemberCard from "./components/TeamMemberCard";

const Home = () => {

  const sectionGap = { base: "50px", md: "75px" }

  return (
    <Flex
      marginTop={sectionGap}
      marginBottom="200px"
      gap={sectionGap}
      flexDirection="column"
      flex="1"
    >
      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="stretch"
        justifyContent="space-between"
        gap={{ base: "5", md: "auto" }}
      >
        <NumberCard number="9" text="nationalities to choose from" />
        <NumberCard number="49" text="already trained models" />
        <NumberCard number="149" text="custom models" />
      </Flex>

      <Grid
        templateRows={{ base: "auto auto", md: "auto auto" }}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        align="center"
        gap="7"
      >
        <GridItem
          marginLeft={{ base: "none", md: "auto" }} 
        >
          <LinkCard
            subTitle="Our paper published in AI &amp; Society:"
            title="“Equal accuracy for Andrew and Abubakar—detecting and mitigating bias in name-ethnicity classification algorithms”"
            link="https://www.npmjs.com/package/react-countup"
            linkText="link.springer.com"
          />
        </GridItem>

        <GridItem
          marginRight={{ base: "none", md: "auto" }} 
          >
          <LinkCard
            subTitle="Our paper published in AI &amp; Society:"
            title="“Equal accuracy for Andrew and Abubakar—detecting and mitigating bias in name-ethnicity classification algorithms”"
            link="https://www.npmjs.com/package/react-countup"
            linkText="link.springer.com"
          />
        </GridItem>
        
        <GridItem
          colSpan={{ base: "none", md: 2 }}
        >
          <LinkCard
            subTitle="Our paper published in AI &amp; Society:"
            title="“Equal accuracy for Andrew and Abubakar—detecting and mitigating bias in name-ethnicity classification algorithms”"
            link="https://www.npmjs.com/package/react-countup"
            linkText="link.springer.com"
          />
        </GridItem>

      </Grid>

      <VStack
        borderTopWidth="1px"
        borderTopColor="lightGray"
        paddingTop={sectionGap}
        gap="7"
        align="left"
      >
        <Text
          color="textDark"
          fontWeight="bold"
          fontSize="xl"
          marginX="auto"
        >
          About...
        </Text>

        <VStack
          gap="2"
          align="left"
        >
          <Text
            color="textDark"
            fontWeight="bold"
            fontSize="sm"
          >
            ... this project and our motivation   
          </Text>

          <Text
            color="textLight"
            fontSize="xs"
            textAlign="left"
          >
            Ethnic inequalities come in many shades, and uncovering them requires versatile research tools. Without knowledge about these inequalities, we have no basis for combating them. Embracing the shift within the social sciences from a 'colour-blind' to a 'colour-conscious' concept of justice, we've developed a name-ethnicity classification tool to infuse data with 'colour-consciousness'. This tool, available for free on our website, is customized to your research needs. You can choose relevant nationalities, and we automatically train a tailor-made machine learning classifier for you using a dataset from the UK government agency CompaniesHouse, which contains roughly 7.3 million names from across the globe. Check out our GitHub repository to see how we built this tool, and join us in opening our eyes to the coloured inequalities of our times.  
          </Text>
        </VStack>

        <VStack
          gap="8"
          align="left"
        >
          <Text
            color="textDark"
            fontWeight="bold"
            fontSize="sm"
          >
            ... our team  
          </Text>

          <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "5", md: "auto" }}
            alignItems="stretch"
          >
            <TeamMemberCard
              name="Theodor Peifer"
              description="BSc. Student in Computer Science and Design, Munich University of Applied Sciences"
              linkedInLink="www.google.com"
              githubLink="www.google.com"
              imageURL="/assets/team-member-2.png"
            />
            <TeamMemberCard
              name="Lena Hafner"
              description="Phd. Candidate in Politics and International Studies, University of Cambridge"
              linkedInLink="www.google.com"
              imageURL="/assets/team-member-2.png"
            />
            <TeamMemberCard
              name="Franziska Hafner"
              description="MSc, Student in Social Data Science, University of Oxford"
              linkedInLink="www.google.com"
              imageURL="/assets/team-member-2.png"
            />
          </Flex>
        </VStack>
      </VStack>

    </Flex>
  );
};

export default Home;
