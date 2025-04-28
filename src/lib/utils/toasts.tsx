import Cookies from "js-cookie";
import { AccessLevel } from "../../types";


export function acessAlertToast(toast: any) {
  const accessLevel = Cookies.get("access");
  const accessLevelReason = Cookies.get("access_level_reason");
  
  const accountPendingTitle = "Account under review.";
  const accountPendingDescription = "We are currently reviewing your account and the usage description you have provided. Currently you don't have access to use our models. Please check in later!";
  const accountRestrictedTitle = "Account access restricted.";
  const accountRestrictedDescription = (
    <>
      <p>
        Since May 2025, we require users to provide a description of how they are using our service to ensure ethical compliance.
        Your usage description is either missing or insufficient (see the reason below).
        Please update it in your user settings or contact us via email.
      </p>
      <br />
      <p>
        <b>Access restriction reason:</b> {accessLevelReason}
      </p>
    </>
  );

  const isPending = accessLevel === AccessLevel.PENDING.toString();

  toast.closeAll();
  toast({
    title: isPending ? accountPendingTitle : accountRestrictedTitle,
    description: isPending ? accountPendingDescription : accountRestrictedDescription,
    status: "warning",
    duration: 120000,
    isClosable: true,
    position: "top",
  });
}