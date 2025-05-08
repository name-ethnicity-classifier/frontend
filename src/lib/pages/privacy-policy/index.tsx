import { Flex, Text, Button, Box, Heading, Link, List, ListItem } from "@chakra-ui/react";


const PrivacyPolicy = () => {
  return (
    <Box marginY={{ base: "25", md: "50" }}>
      <Heading size="md" mb={4}>
        Imprint
      </Heading>

      <Text>Theodor Peifer</Text>
      <Text>theodorpeifer[at]gmail</Text>
      <Text>Clemensstraße 80803 Munich, Germany</Text>

      <Heading size="md" mt={8} mb={4}>
        Privacy Policy
      </Heading>
      <Text>
        Your privacy is important to us. It is name-to-ethnicity's policy to
        respect your privacy and comply with any applicable law and regulation
        regarding any personal information we may collect about you, including
        across our website, <Link href="https://www.name-to-ethnicity.com" isExternal>https://www.name-to-ethnicity.com</Link>,
        and other sites we own and operate.
      </Text>
      <Text mt={4}>
        This policy is effective as of 21 December 2021 and was last updated on
        08 May 2025.
      </Text>

      {/* Information We Collect */}
      <Heading size="sm" mt={8} mb={4}>
        Information We Collect
      </Heading>
      <Text>
        Information we collect includes both information you knowingly and
        actively provide us when using or participating in any of our services
        and promotions, and any information automatically sent by your devices
        in the course of accessing our products and services.
      </Text>

      {/* Log Data */}
      <Heading size="xs" mt={6} mb={2}>
        Log Data
      </Heading>
      <Text>
        When you visit our website, our servers may automatically log the
        standard data provided by your web browser. It may include your device's
        Internet Protocol (IP) address, your browser type and version, the pages
        you visit, the time and date of your visit, the time spent on each page,
        other details about your visit, and technical details that occur in
        conjunction with any errors you may encounter.
      </Text>
      <Text mt={4}>
        Please be aware that while this information may not be personally
        identifying by itself, it may be possible to combine it with other data
        to personally identify individual persons.
      </Text>

      <Heading size="xs" mt={6} mb={2}>
        Personal Information
      </Heading>
      <Text>
        We may ask for personal information which may include one or more of
        the following:
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- full name</Text></ListItem>
        <ListItem><Text>- email</Text></ListItem>
        <ListItem><Text>- academic/professional role</Text></ListItem>
        <ListItem><Text>- description of what the service is being used for</Text></ListItem>
      </List>

      <Heading size="xs" mt={6} mb={2}>
        Legitimate Reasons for Processing Your Personal Information
      </Heading>
      <Text>
        We only collect and use your personal information when we have a
        legitimate reason for doing so. In which instance, we only collect
        personal information that is reasonably necessary to provide our
        services to you.
      </Text>

      {/* Collection and Use */}
      <Heading size="xs" mt={6} mb={2}>
        Collection and Use of Information
      </Heading>
      <Text>
        We may collect personal information from you when you do any of the
        following on our website:
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- Use a mobile device or web browser to access our content</Text></ListItem>
        <ListItem><Text>- Contact us via email, social media, or on any similar technologies</Text></ListItem>
      </List>

      {/* Purposes */}
      <Text mt={4}>
        We may collect, hold, use, and disclose information for the following
        purposes, and personal information will not be further processed in a
        manner that is incompatible with these purposes:
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- To contact and communicate with you</Text></ListItem>
        <ListItem>
          <Text>
            - To enable you to access and use our website, associated applications,
            and associated social media platforms
          </Text>
        </ListItem>
        <ListItem><Text>- For internal record keeping and administrative purposes</Text></ListItem>
        <ListItem>
          <Text>
            - For security and fraud prevention, and to ensure that our sites and
            apps are safe, secure, and used in line with our terms of use
          </Text>
        </ListItem>
      </List>

      {/* Security */}
      <Heading size="xs" mt={6} mb={2}>
        Security of Your Personal Information
      </Heading>
      <Text>
        When we collect and process personal information, and while we retain
        this information, we will protect it within commercially acceptable
        means to prevent loss and theft, as well as unauthorized access,
        disclosure, copying, use, or modification.
      </Text>
      <Text mt={4}>
        Although we will do our best to protect the personal information you
        provide to us, we advise that no method of electronic transmission or
        storage is 100% secure, and no one can guarantee absolute data security.
      </Text>

      {/* Retention */}
      <Heading size="xs" mt={6} mb={2}>
        How Long We Keep Your Personal Information
      </Heading>
      <Text>
        We keep your personal information only for as long as we need to. This
        time period may depend on what we are using your information for, in
        accordance with this privacy policy. If your personal information is no
        longer required, we will delete it or make it anonymous by removing all
        details that identify you.
      </Text>
      <Text mt={4}>
        However, if necessary, we may retain your personal information for our
        compliance with a legal, accounting, or reporting obligation or for
        archiving purposes in the public interest, scientific, or historical
        research purposes or statistical purposes.
      </Text>

      {/* Communication */}
      <Heading size="sm" mt={6} mb={2}>
        Communication and Emails
      </Heading>
      <Text>
        By using our services, you agree to receive communications from us.
      </Text>
      <List spacing={2} mt={2}>
        <ListItem>
          <Text>- 
            <b>Service Notifications:</b> Emails from
            noreply[@]name-to-ethnicity.com for important service-related notifications,
            including account verification, security updates, and essential
            information about your account.
          </Text>
        </ListItem>
        <ListItem>
          <Text>- 
            <b>Surveys and Feedback:</b> Occasional emails from
            theodorpeifer[@]gmail.com or info[@]name-to-ethnicity.com for the purpose of surveys, user feedback, and
            improvements to enhance your experience with our services.
          </Text>
        </ListItem>
      </List>

      <Heading size="sm" mt={6} mb={2}>
        Children's Privacy
      </Heading>
      <Text>
        We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        International Transfers of Personal Information
      </Heading>
      <Text>
        The personal information we collect is stored under the samer server facility which hosts this web application and is not transmitted to any third party. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy. 
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Your Rights and Controlling Your Personal Information
      </Heading>
      <Text>
        You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.
      </Text>
      <Text>
        If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person's consent to provide the personal information to us. 
      </Text>
      <Text>
        If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity. 
      </Text>
      <Text>
        If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date. 
      </Text>
      <Text>
        If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint. 
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Use of Cookies
      </Heading>
      <Text>
        We use “cookies” for authentication and alanytics purposes only. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit. 
      </Text>
      <Text>
        List of Cookies in use:
      </Text>
      <List spacing={2} mt={2}>
        <ListItem><Text>- <b>email</b>: This cookie stores your email to facilitate requests and secure account access.</Text></ListItem>
        <ListItem><Text>- <b>token</b>: This cookie holds an authorization token, functioning as a secure key for authorized account access.</Text></ListItem>
        <ListItem><Text>- <b>access</b>: This cookie stores wether you have full access to our service or not in order to adapt the UI accordingly.</Text></ListItem>
        <ListItem><Text>- <b>access_level_reason</b>: This cookie stores the reason of your access level in order to notify you if it changes.</Text></ListItem>
        <ListItem><Text>- <b>cc_cookie</b>: This cookie stores the users cookie preferences.</Text></ListItem>
      </List>

      <Heading size="sm" mt={6} mb={2}>
        Limits of Our Policy
      </Heading>
      <Text>
        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
      </Text>

      <Heading size="sm" mt={6} mb={2}>
        Contact Us
      </Heading>
      <Text>
        For any questions or concerns regarding your privacy, you may contact us
        using the following details:
      </Text>
      <Text mt={2}>
        <Text as="b">Theodor Peifer</Text>
        <br />
        <Link href="mailto:theodorpeifer@gmail">theodorpeifer[at]gmail.com</Link>
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
