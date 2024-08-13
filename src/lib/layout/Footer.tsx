import { Flex, HStack, VStack, Image, Text, useBreakpointValue, Link } from "@chakra-ui/react";
import {
  LuShieldCheck,
  LuScroll,
  LuGithub,
  LuGift,
  LuHeart,
} from "react-icons/lu";

interface FooterLinkChild {
  name: string;
  link: string;
  icon?: any;
  isExternal: boolean;
}

interface FooterColumnProps {
  title: string;
  linkChildren: FooterLinkChild[];
}

const FooterColumn = (props: FooterColumnProps) => {
  return (
    <VStack align="flex-start" gap="2">
      <Text fontWeight="bold" color="white" fontSize="xs">
        {props.title}
      </Text>
      <Flex
        align="left"
        flexDirection={{ base: "row", md: "column" }}
        gap="5"
      >
        {props.linkChildren.map((linkChild: FooterLinkChild, index: number) => (
          <Link
            href={linkChild.link}
            key={index}
            _hover={{ underline: "none" }}
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
      </Flex>
    </VStack>
  );
};

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
      backgroundColor="primaryBlue"
    >
      <Flex
        width="full"
        marginX="auto"
        maxWidth={1500}
        paddingX={{ base: "10", lg: "50", xl: "100" }}
        paddingY="10"
        flexDirection={{ base: "column", md: "row" }}
        alignSelf="flex-start"
        justifyContent="space-between"
        gap="5"
      >
        <VStack align="flex-start" gap="2">
          <HStack gap="3">
            <Image src="/assets/logo-white.svg" size="sm" />
            <Text fontWeight="bold" color="white" fontSize="xs">
              NAME-TO-ETHNICITY
            </Text>
          </HStack>
          <Text color="white" fontSize="xs" whiteSpace="pre-wrap">
            {"© copyright 2024, Theodor Peifer"}
            {!isMobile ? "\n": ", "}
            {"theodorpeifer@gmail.com"}
          </Text>
        </VStack>
        
        <FooterColumn
          title="LINKS"
          linkChildren={[
            {
              name: "GitHub",
              link: "https://www.github.com",
              icon: <LuGithub color="white" />,
              isExternal: true,
            },
            {
              name: "Donate",
              link: "https://www.github.com",
              icon: <LuGift color="white" />,
              isExternal: true,
            },
          ]}
        />
        <FooterColumn
          title="LEGAL"
          linkChildren={[
            {
              name: "Privacy & Imprint",
              link: "/",
              icon: <LuShieldCheck color="white" />,
              isExternal: false,
            },
            {
              name: "Terms of Service",
              link: "/",
              icon: <LuScroll color="white" />,
              isExternal: false,
            },
          ]}
        />
        <FooterColumn
          title="TEAM"
          linkChildren={[
            {
              name: "Theodor Peifer",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true,
            },
            {
              name: "Lena Hafner",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true,
            },
            {
              name: "Franziska Hafner",
              link: "https://www.linkedin.com",
              icon: <LuHeart color="white" />,
              isExternal: true,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default Footer;
