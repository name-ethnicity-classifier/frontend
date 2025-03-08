import { Flex, Text, Button, Box, Heading, Link, List, ListItem } from "@chakra-ui/react";


const TermsOfService = () => {
  return (
    <Box marginY={{ base: "25", md: "50" }}>
      <Heading size="md" mb={4}>
        Terms and Conditions of Use
      </Heading>

      <Heading size="sm" mt={8} mb={4}>
        Terms
      </Heading>
      <Text>
        By accessing this website, accessible from <Link href="https://www.name-to-ethnicity.com" isExternal>https://www.name-to-ethnicity.com</Link>, you are agreeing to be bound by these website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this website are protected by copyright and trade mark law.
      </Text>

      <Heading size="sm" mt={8} mb={4}>
        Use License
      </Heading>
      <Text>
        Permission is granted to temporarily download one copy of the materials on name-to-ethnicity's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- modify or copy the materials</Text></ListItem>
        <ListItem><Text>- use the materials for any commercial purpose or for any public display</Text></ListItem>
        <ListItem><Text>- attempt to reverse engineer any software contained on name-to-ethnicity's website</Text></ListItem>
        <ListItem><Text>- remove any copyright or other proprietary notations from the materials</Text></ListItem>
        <ListItem><Text>- transferring the materials to another person or "mirror" the materials on any other server</Text></ListItem>
      </List>

      <Heading size="sm" mt={6} mb={2}>
        Disclaimer and Liability
      </Heading>
      <Text>
        All the materials on name-to-ethnicity's website are provided "as is". name-to-ethnicity makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, name-to-ethnicity does not make any representations concerning the accuracy or reliability of the use of the materials on its website or otherwise relating to such materials or any sites linked to this website.
      </Text>
      
      <br />
      <Text>
        The results produced by this tool are not 100% accurate and should be interpreted as probabilistic estimates rather than definitive classifications. N2E provides this tool for research and analytical purposes, but we are not responsible for how individuals choose to use it.
      </Text>
      
      <br />
      <Text>
        name-to-ethnicity or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on name-to-ethnicity's website, even if name-to-ethnicity or an authorized representative of this website has been notified, orally or written, of the possibility of such damage. Some jurisdictions do not allow limitations on implied warranties or limitations of liability for incidental damages; these limitations may not apply to you.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Ethical Guidelines
      </Heading>
      <Text>
        By accessing and using this service, you agree to follow the ethical guidelines outlined in the onboarding process. Users are solely responsible for ensuring that their use of the tool complies with applicable laws, regulations, and ethical standards. Any misuse, including attempts to personally identify individuals or apply results in discriminatory ways, is strictly against our guidelines.
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- Research-Only Purpose: This tool is intended for studying demographic patterns, assessing diversity, and conducting research—whether in academia, journalism, or organizational analysis.</Text></ListItem>
        <ListItem><Text>- Not for Personal Identification: The results should not be used to assign ethnicity to individuals in personal databases, hiring processes, customer profiling, or any private-sector decision-making.</Text></ListItem>
        <ListItem><Text>- Ethical Responsibility: Misuse of this service for discriminatory, invasive, or unethical purposes may result in account suspension.</Text></ListItem>
        <ListItem><Text>- Commitment to Fair Use: Users should apply this tool responsibly, promoting fairness, inclusivity, and transparency while avoiding any use that could lead to discrimination or harm.</Text></ListItem>
      </List>
      
      <br />
      <Text>
        N2E reserves the right to restrict or revoke access to users who violate these principles.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Revisions and Errata
      </Heading>
      <Text>
        The materials appearing on name-to-ethnicity's website may include technical, typographical, or photographic errors. name-to-ethnicity will not promise that any of the materials in this website are accurate, complete, or current. name-to-ethnicity may change the materials contained on its website at any time without notice. name-to-ethnicity does not make any commitment to update the materials.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Links
      </Heading>
      <Text>
        name-to-ethnicity has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by name-to-ethnicity of the site. The use of any linked website is at the user’s own risk.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Site Terms of Use Modifications
      </Heading>
      <Text>
        name-to-ethnicity may revise these Terms of Use for its website at any time without prior notice. By using this website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Your Privacy
      </Heading>
      <Text>
        Please read our <Link href="/privacy-policy" isExternal>Privacy Policy</Link>.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Governing Law
      </Heading>
      <Text>
        Any claim related to name-to-ethnicity's website shall be governed by the laws of Germany without regards to its conflict of law provisions.
      </Text>
    </Box>
  );
};

export default TermsOfService;
