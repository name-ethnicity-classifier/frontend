import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";


export default function openCookieManager() {
	CookieConsent.run({
		guiOptions: {
			consentModal: {
				position: 'bottom left',
				equalWeightButtons: false,
				flipButtons: false
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: false,
				flipButtons: false
			}
		},
		categories: {
			necessary: {
				enabled: true,
				readOnly: true
			},
			analytics: {
				enabled: true,
				readOnly: false
			}
		},
		onConsent: ({ }) => {
			console.log("Cookie preferences set.");
			console.log(CookieConsent.getCookie());
		},

		onChange: ({ }) => {
			console.log("Cookie preferences changed.");
			console.log(CookieConsent.getCookie());
		},
		language: {
			default: "en",
			translations: {
				en: {
					consentModal: {
						title: "Cookies 🍪",
						description: "We use cookies only to safely log you into your account and to gather analytics that help us improve the site. We don't track and we don't sell!",
						acceptAllBtn: "Accept all",
						acceptNecessaryBtn: "Reject all",
						showPreferencesBtn: "Manage Individual preferences"
					},
					preferencesModal: {
						title: "Manage cookie preferences",
						acceptAllBtn: "Accept all",
						acceptNecessaryBtn: "Reject all",
						savePreferencesBtn: "Accept current selection",
						closeIconLabel: "Close modal",
						sections: [
							{
								description: "We use cookies only to safely log you into your account and to gather analytics that help us improve the site. We don't track and we don't sell!",
							},
							{
								title: "Necessary authentication cookies",
								description: "These include two cookies necessary to log you into your account: Email and authentication token. These can not be disabled but only take effect if you create an account.",
								linkedCategory: "necessary"
							},
							{
								title: "Analytics cookies",
								description: "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
								linkedCategory: "analytics"
							},
							{
								title: "More information",
								description: "For any queries in relation to my policy on cookies and your choices, please <a href='mailto:theodorpeifer@gmail'>contact us</a>."
							}
						]
					}
				}
			}
		}
	});
}