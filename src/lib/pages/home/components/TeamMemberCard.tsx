import { Flex, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import {
    LuGithub,
    LuLinkedin,
    LuGift,
    LuHeart,
  } from "react-icons/lu";
  import { IconType } from "react-icons";


  const SocialButton = (props: { icon: IconType, link: string }) => {
    return (
        <Link
            href={props.link}
            isExternal={true}
        >
            <Flex
                borderRadius="7"
                backgroundColor="primaryBlue"
                justifyContent="center"
                align="center"
                width={{ base: "25px", md: "30px" }}
                height={{ base: "25px", md: "30px" }}
                padding="2"
                _hover={{
                    bg: "secondaryBlue"
                }}
            >
                <props.icon color="white" />
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
      backgroundColor="surfaceBlue"
      padding="5"
      borderRadius="7"
      gap={{ base: "4", md: "4" }}
      flexDirection={{ base: "row", md: "column" }}
      flex="1"
      align="flex-start"
      maxWidth={{ base: "full", md: "300px" }}
    >
        <Image
            src={props.imageURL}
            marginX="auto"
            height={{ base: "100px", md: "150px" }}
            borderRadius={{ base: "7px", md: "full" }}
            aspectRadio="1"
        />
        <VStack
            flex={{ base: "4", md: "1" }}
            align={{ base: "left", md: "center" }}
        >
            <Text
                fontWeight="bold"
                color="primaryBlue"
                fontSize="xs"
                textAlign={{ base: "left", md: "center" }}
            >
                {props.name}            
            </Text>
            <Text
                color="textLight"
                fontSize="xs"
                textAlign={{ base: "left", md: "center" }}
            >
                {props.description}            
            </Text>

            <HStack marginTop="auto">
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
