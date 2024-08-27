import { Flex, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import {
    LuGithub,
    LuLinkedin,
  } from "react-icons/lu";
  import { IconType } from "react-icons";


  const SocialButton = (props: { icon: IconType, link: string }) => {
    return (
        <Link
            href={props.link}
            isExternal={true}
        >
            <Flex
                borderRadius="full"
                backgroundColor="secondaryBlue.100"
                justifyContent="center"
                align="center"
                width={{ base: "25px", md: "30px" }}
                height={{ base: "25px", md: "30px" }}
                padding="2"
                _hover={{
                    bg: "secondaryBlue.200"
                }}
            >
                <props.icon color="var(--chakra-colors-primaryBlue-100)" />
            </Flex>
        </Link>
    );
};

interface TeamMemberCardProps {
    name: string,
    description: string,
    imageURL: string,
    linkedInLink?: string
    githubLink?: string
  }


const TeamMemberCard = (props: TeamMemberCardProps) => {

  return (
    <Flex
      backgroundColor="surfaceBlue.100"
      padding="4"
      borderRadius="7"
      gap="4"
      flexDirection="row"
      flex="1"
      align="flex-start"
    >   
        <Box
            flex={{base: "2", sm: "1", lg: "3" }}
        >
            <Image
                src={props.imageURL}
                borderRadius="7px"
                aspectRatio="1"
            />
        </Box>
            
        <VStack
            align="left"
            flex="4"
        >
            <Text
                fontWeight="bold"
                color="primaryBlue.100"
                fontSize="xs"
            >
                {props.name}            
            </Text>
            <Text>
                {props.description}            
            </Text>

            <HStack alignItems="flex-end" flexGrow={1}>
                {
                    props.linkedInLink && (
                        <SocialButton
                            icon={LuLinkedin}
                            link={props.linkedInLink}
                        />
                    )
                }
                {
                    props.githubLink && (
                        <SocialButton
                            icon={LuGithub}
                            link={props.githubLink}
                        />
                        
                    )
                }
            </HStack>
        </VStack>

    </Flex>
  );
};

export default TeamMemberCard;
