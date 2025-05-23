import { Flex, Grid, GridItem, Heading, Link, Text, VStack, Image, HStack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HowToSection from "./components/HowToSection";
import LinkCard from "./components/LinkCard";
import NumberCard from "./components/NumberCard";
import TeamMemberCard from "./components/TeamMemberCard";
import { useAuth } from "~/lib/contexts/AuthContext";
import { fetchModels, fetchDefaultModels } from "~/lib/utils/serverRequests";
import { ModelType } from "~/types";
import { fetchNationalityData } from "~/lib/utils/serverRequests";
import SupportWidget from "./components/SupportWidget";
import EthicalGuidelineModal from "~/lib/components/EthicalGuidelinesModal";
import InfoBanner from "./components/InfoBanner";


const Home = () => {
	const { isLoggedIn } = useAuth();

  const [customModels, setCustomModels] = useState<ModelType[]>([]);
  const [defaultModels, setDefaultModels] = useState<ModelType[]>([]);

  const [nationalityData, setNationalityData] = useState<Record<string, number> | null>(null);
  const [nationalityAmount, setNationalityAmount] = useState<number>(0);
  const [nameAmount, setNameAmount] = useState<number>(0);

	const [ethicalGuidelinesModalOpen, setEthicalGuidelinesModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchModels((customModels: ModelType[], defaultModels: ModelType[]) => {
        setCustomModels(customModels);
        setDefaultModels(defaultModels);
      });
    }
    else {
      fetchDefaultModels((defaultModels: ModelType[]) => {
        setCustomModels([]);
        setDefaultModels(defaultModels);
      });
    }

    fetchNationalityData((responseData) => {
      setNationalityData(responseData.nationalities);
      setNationalityAmount(Object.keys(responseData.nationalities).length);
      setNameAmount(Object.values(responseData.nationalities).reduce((acc, value) => acc + value, 0))
    });
  }, [isLoggedIn]);

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
          cardTitle="origins to choose from"
          modalData={nationalityData || {}}
          modalColumns={["Origin", "Names"]}
          modalTitle="Our dataset"
          modalSearchBar={true}
          modalDescription={
            <>
              <Text>
                We sampled our dataset from the UK Census Database, resulting in <b>{nameAmount}</b> names from <b>{nationalityAmount}</b> different origins.
              </Text>
              <Text>
                Here is an overview of how those origins are distributed in the dataset:
              </Text>
            </>
          }
        />
        <NumberCard
          cardTitle="already trained models"
          modalData={
            defaultModels.reduce((acc, model) => {
              acc[model.name] = model.accuracy;
              return acc;
            }, {} as Record<string, number>)
          }
          modalColumns={["Model name", "Accuracy"]}
          modalTitle="Our models"
          modalDescription={
            <>
              <Text>
                We have a growing amount of ready-to-go models which are each trained on a specific set of origins.
              </Text>
              <Text>
                Take a look and see if one of them fits your use-case. If not, you can request a custom model at the <Link href="/model-hub" color="var(--chakra-colors-primaryBlue-100)">Model Hub</Link>!
              </Text>
            </>
          }
        />
        <NumberCard
          cardTitle="custom models"
          modalData={
            customModels.reduce((acc, model) => {
              acc[model.name] = model.accuracy || "training...";
              return acc;
            }, {} as Record<string, number | string>)
          }
          modalColumns={["Model name", "Accuracy"]}
          modalTitle="Your custom models"
          modalDescription={
            <>
              <Text>
                If none of our default models fit your use-case you can request a custom one which will only be trained on the origins you specify.
              </Text>
              <Text>
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

      <InfoBanner
        title="Ethical disclaimer"
        description="The ethnic origin of an individual CAN NOT and SHOULD NOT be reliably inferred from their name alone. Only when analyzing names at scale, patterns can emerge that offer insights into social structures and inequalities. To ensure ethical compliance, we require users to provide a description of how they intend to use our service."
        iconUrl="/assets/ethics-illustration.png"
        onClick={() => setEthicalGuidelinesModalOpen(true)}
        buttonDescription="See ethical guidelines"
      />

      <EthicalGuidelineModal
        isOpen={ethicalGuidelinesModalOpen}
        includeInteractiveStages={false}
        onComplete={() => {
          setEthicalGuidelinesModalOpen(false);
        }}
        onClose={() => setEthicalGuidelinesModalOpen(false)}
      />

      <VStack
        borderTopWidth="1px"
        borderTopColor="lightGray"
        paddingTop={sectionGap}
        gap="7"
        align="left"
        id="about-section"
      >
        <Heading
          variant="h2"
          marginX="auto"
        >
          About...
        </Heading>


        <VStack
          gap="5"
          align="left"
        >
          <Heading
            variant="h3"
          >
            ... this project and our motivation   
          </Heading>

          <Text
            textAlign="justify"
          >
            Ethnic inequalities come in many shades, and uncovering them requires versatile research tools. Without knowledge about these inequalities, we have no basis for combating them. Embracing the shift within the social sciences from a 'colour-blind' to a 'colour-conscious' concept of justice, we've developed a name-ethnicity classification tool to infuse data with 'colour-consciousness'. This tool, available for free on this website, is customizable to your research needs. You can choose relevant origins, and we automatically train a tailor-made machine learning classifier for you, using a dataset from the UK government agency CompaniesHouse, which contains roughly 7.3 million names from across the globe. Check out our GitHub repository to see how we built this tool, and join us in opening our eyes to the coloured inequalities of our times.  
          </Text>
        </VStack>

        <VStack
          gap="5"
          align="left"
        >
          <Heading
            variant="h3"
          >
            ... our team  
          </Heading>

          <Flex
            justifyContent="space-between"
            flexDirection={{ base: "column", lg: "row" }}
            gap="5"
          >
            <TeamMemberCard
              name="Theodor Peifer"
              description="BSc. Student in Computer Science and Design, Munich University of Applied Sciences"
              linkedInLink="https://www.linkedin.com/in/theodor-peifer-ab6b77190/"
              githubLink="https://github.com/theopfr"
              imageURL="/assets/member-t.svg"
            />
            <TeamMemberCard
              name="Lena Hafner"
              description="PhD. Candidate in Politics and International Studies, University of Cambridge"
              linkedInLink="https://www.linkedin.com/in/lena-folonica-hafner/"
              imageURL="/assets/member-l.svg"
            />
            <TeamMemberCard
              name="Franziska Hafner"
              description="MSc. Student in Social Data Science, University of Oxford"
              linkedInLink="https://www.linkedin.com/in/franziska-hafner/"
              imageURL="/assets/member-f.svg"
            />
          </Flex>
          
          <SupportWidget />
   
        </VStack>

      </VStack>

      <VStack
        borderTopWidth="1px"
        borderTopColor="lightGray"
        paddingTop={sectionGap}
        gap="7"
        align="left"
        id="how-it-works-section"
      >
        <Heading
          variant="h2"
          marginX="auto"
        >
          How to ...
        </Heading>

        <HowToSection />
      </VStack>
      
    </Flex>
  );
};

export default Home;
