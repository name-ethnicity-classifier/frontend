import { Flex, Grid, GridItem, Box, Link, Text, VStack, Spacer, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { sum } from "~/lib/utils/sample";

import HowToSection from "./components/HowToSection";
import LinkCard from "./components/LinkCard";
import NumberCard from "./components/NumberCard";
import TeamMemberCard from "./components/TeamMemberCard";

const Home = () => {


  const nationalityData: Record<string, number> = {
    "german": 21283,
    "greek": 3848,
    "american": 89041,
    "irish": 38347,
    "pakistani": 17848,
    "zimwabwen": 63473
  }

  const defaultModelData: Record<string, number> = {
    "20_nat_and_else": 21283,
    "greek_german_and_else": 3848,
    "european_eastAsian": 89041,
    "irish_australian": 38347,
    "chinese_and_else": 17848,
  }

  const customModelData: Record<string, number> = {
    "20_nat_and_else": 21283,
    "greek_german_and_else": 3848,
  }

  const totalDatasetSize = Object.values(nationalityData).reduce((acc, value) => acc + value, 0);

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
        <NumberCard
          data={nationalityData}
          cardTitle="nationalities to choose from"
          modalTitle="Our dataset"
          modalDescription={
            
            <>
            <Text
              fontSize="xs"
              color="textLight"
            >
              We sampled our dataset from the UK Census Database, resulting in <b>{totalDatasetSize}</b> names from <b>{Object.keys(nationalityData).length}</b> different nationalities.
            </Text>
            <Text
              fontSize="xs"
              color="textLight"
            >
              Here is an overview of how those nationalities are distributed in the dataset:              </Text>
          </>
          }
        />
        <NumberCard
          data={defaultModelData}
          cardTitle="already trained models"
          modalTitle="Our models"
          modalDescription={
            <>
              <Text
                fontSize="xs"
                color="textLight"
              >
                We have a growing amount of ready-to-go models which are each trained on a specific set of nationalities.
              </Text>
              <Text
                fontSize="xs"
                color="textLight"
              >
                Take a look and see if one of them fits your use-case. If not, you can request a custom model at the <Link href="/model-hub" color="blue">Model Hub</Link>!
              </Text>
            </>
          }
        />
        <NumberCard
          data={customModelData}
          cardTitle="custom models"
          modalTitle="Your custom models"
          modalDescription={
            <>
              <Text
                fontSize="xs"
                color="textLight"
              >
                If none of our default models fit your use-case you can request a custom one which will only be trained on the nationalities you specify.              </Text>
              <Text
                fontSize="xs"
                color="textLight"
              >
                Here is a list of your custom models:
              </Text>
            </>
          }
        />
      </Flex>

      <Grid
        templateRows={{ base: "auto auto", md: "auto auto" }}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        align="center"
        gap="7"
        alignItems="stretch"
      >
        <GridItem
          marginLeft={{ base: "none", md: "auto" }}
        >
          <LinkCard
            subTitle="Our paper published in AI &amp; Society:"
            title="“Equal accuracy for Andrew and Abubakar—detecting and mitigating bias in name-ethnicity classification algorithms”"
            link="https://link.springer.com/article/10.1007/s00146-022-01619-4"
            linkText="link.springer.com"
          />
        </GridItem>

        <GridItem
          marginRight={{ base: "none", md: "auto" }} 
          >
          <LinkCard
            subTitle="Paper about an N2E use-case in health care:"
            title="“Artificial Intelligence (AI) Reveals Ethnic Disparities in Cataract Detection and Treatment”"
            link="https://link.springer.com/article/10.1007/s40123-024-00945-8"
            linkText="link.springer.com"
          />
        </GridItem>
        
        <GridItem
          colSpan={{ base: "none", md: 2 }}
        >
          <LinkCard
            subTitle="Find us on GitHub:"
            title="If you are interested in how we built N2E, want to contribute or report issues and bugs, check out our GitHub organization!"
            link="https://github.com/name-ethnicity-classifier"
            linkText="github.com"
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
          gap="5"
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
          gap="5"
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
              linkedInLink="https://www.linkedin.com/in/theodor-peifer-ab6b77190/"
              githubLink="https://github.com/theopfr"
              imageURL="/assets/team-member-2.png"
            />
            <TeamMemberCard
              name="Lena Hafner"
              description="Phd. Candidate in Politics and International Studies, University of Cambridge"
              linkedInLink="https://www.linkedin.com/in/theodor-peifer-ab6b77190/"
              imageURL="/assets/team-member-2.png"
            />
            <TeamMemberCard
              name="Franziska Hafner"
              description="MSc, Student in Social Data Science, University of Oxford"
              linkedInLink="https://www.linkedin.com/in/theodor-peifer-ab6b77190/"
              imageURL="/assets/team-member-2.png"
            />
          </Flex>
        </VStack>
      </VStack>

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
          How to ...
        </Text>

        <HowToSection />
        
      </VStack>

    </Flex>
  );
};

export default Home;
