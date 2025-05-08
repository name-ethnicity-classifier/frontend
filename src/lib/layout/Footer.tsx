import { Flex, HStack, VStack, Image, Text, useBreakpointValue, Link, Button } from "@chakra-ui/react";
import {
  LuShieldCheck,
  LuScroll,
  LuGithub,
  LuGift,
  LuHeart,
  LuMail,
  LuCookie,
} from "react-icons/lu";

interface FooterLinkChild {
  name: string;
  link?: string;
  icon?: any;
  isExternal?: boolean;
  onClick?: () => void;
  opensCookieManager?: boolean;
}

interface FooterColumnProps {
  title: string;
  linkChildren: FooterLinkChild[];
}

const FooterColumn = (props: FooterColumnProps) => {
  return (
    <VStack
      align="flex-start"
      gap={{base: "1", md: "5" }}
    >
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
            <HStack
              onClick={linkChild.onClick}
              data-cc={linkChild.opensCookieManager ? "show-consentModal" : undefined}
            >
              {linkChild.icon}
              <Text fontSize="xs" color="white" fontWeight="normal">
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
      flexDirection="column"
      backgroundColor="primaryBlue.100"
    >
      <VStack
        maxWidth={1750}
        width="full"
        marginX="auto"
        paddingX={{ base: "5", md: "10", lg: "50", xl: "100" }}
        paddingY={{ base: "5", md: "10" }}
        gap="10"
      >
        <Flex
          width="full"
          flexDirection={{ base: "column", md: "row" }}
          alignSelf="flex-start"
          justifyContent="space-between"
          gap={{ base: "7", md: "5" }}
        >
          <VStack align="flex-start" gap="4">
            <HStack gap="3">
              <Image src="/assets/logo-white.svg" />
              <Text fontWeight="bold" color="white" fontSize="xs">
                NAME-TO-ETHNICITY
              </Text>
            </HStack>
            <Text color="white" fontSize="xs" whiteSpace="pre-wrap">
              {"© copyright 2024, Theodor Peifer"}
              {!isMobile ? "\n": ", "}
              {"theodorpeifer[at]gmail.com"}
            </Text>

            <VStack alignItems="flex-start">
              <Text
                color="white"
              >
                You have an inquiry or want to collaborate?
              </Text>
              <Button
                bg="white"
                color="primaryBlue.100"
                size="xs"
                leftIcon={<LuMail color="var(--chakra-colors-primaryBlue-100" />}
                _hover={{
                  bg: "white"
                }}
                onClick={() => {
                  window.location.href = "mailto:theodorpeifer@gmail.com?subject=Name-to-Ethnicity Inquiry"
                }}
              >
                send us an email
              </Button>
            </VStack>

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
                link: "/privacy-policy",
                icon: <LuShieldCheck color="white" />,
                isExternal: false,
              },
              {
                name: "Terms of Service",
                link: "/terms-of-service",
                icon: <LuScroll color="white" />,
                isExternal: false,
              },
              {
                name: "Cookie Management",
                icon: <LuCookie color="white" />,
                opensCookieManager: true
              },
            ]}
          />
          <FooterColumn
            title="TEAM"
            linkChildren={[
              {
                name: "Theodor Peifer",
                link: "https://www.linkedin.com/in/theodor-peifer-ab6b77190/",
                icon: <LuHeart color="white" />,
                isExternal: true,
              },
              {
                name: "Lena Hafner",
                link: "https://www.linkedin.com/in/lena-folonica-hafner/",
                icon: <LuHeart color="white" />,
                isExternal: true,
              },
              {
                name: "Franziska Hafner",
                link: "https://www.linkedin.com/in/franziska-hafner/",
                icon: <LuHeart color="white" />,
                isExternal: true,
              },
            ]}
          />
        </Flex>

      </VStack>
    </Flex>
  );
};

export default Footer;
