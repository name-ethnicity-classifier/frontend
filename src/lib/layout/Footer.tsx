import { Flex, HStack, VStack, Image, Text, Box, Link } from '@chakra-ui/react';
import { LuShieldCheck, LuScroll, LuGithub, LuGift, LuHeart } from "react-icons/lu";


interface FooterLinkChild {
  name: string,
  link: string,
  icon?: any,
  isExternal: boolean
}


interface FooterColumnProps {
  title: string,
  linkChildren: FooterLinkChild[]
}


const FooterColumn = (props: FooterColumnProps) => {
  return (
    <VStack align="left" gap="2">
      <Text fontWeight="bold" color="white" fontSize="xs">
        {props.title}
      </Text>
      <VStack align="left">
        {props.linkChildren.map((linkChild: FooterLinkChild, index: number) => (
          <Link
            href={linkChild.link}
            key={index}
            _hover={{underline: "none"}}
            isExternal={linkChild.isExternal}
          >
            <HStack>
              {linkChild.icon}
              <Text fontSize="xs" color="white">
                {linkChild.name}
              </Text>
            </HStack>
          </Link>
        ))}
      </VStack>
    </VStack>
  );
};


const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
      backgroundColor="primaryBlue"
    >
      <HStack
        width="full"
        marginX="auto"
        maxWidth={1500}
        paddingX={100}
        paddingY={4}
        alignSelf="flex-start"
        justifyContent="space-between"
        gap={2}
      >
        <VStack align="left" gap="2">
          <HStack gap="2">
            <Image src="/assets/logo-white.svg" size="sm" />
            <Text
              fontWeight="bold"
              color="white"
              fontSize="xs"
            >
              NAME-TO-ETHNICITY
            </Text>
          </HStack>
          <Box>
            <Text
              color="white"
              fontSize="xs"
            >
              © copyright 2024, Theodor Peifer
            </Text>
            <Text
              color="white"
              fontSize="xs"
            >
              theodorpeifer@gmail.com
            </Text>
          </Box>
        </VStack>
        <FooterColumn
          title={"LINKS"}
          linkChildren={[
            {
              name: "GitHub",
              link: "https://www.github.com",
              icon: <LuGithub color="white" />,
              isExternal: true
            },
            {
              name: "Donate",
              link: "https://www.github.com",
              icon: <LuGift color="white" />,
              isExternal: true
            }
          ]}
        />
        <FooterColumn
          title={"LEGAL"}
          linkChildren={[
            {
              name: "Privacy & Imprint",
              link: "/",
              icon: <LuShieldCheck color="white" />,
              isExternal: false
            },
            {
              name: "Terms of Service",
              link: "/",
              icon: <LuScroll color="white" />,
              isExternal: false
            }
          ]}
        />
        <FooterColumn
          title={"TEAM"}
          linkChildren={[
            {
              name: "Theodor Peifer",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true
            },
            {
              name: "Lena Hafner",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true
            },
            {
              name: "Franziska Hafner",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true
            }
          ]}
        />
      </HStack>
      
    </Flex>
  );
};

export default Footer;
