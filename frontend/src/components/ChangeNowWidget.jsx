import React from "react";
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * ChangeNowWidget
 * Embeds the ChangeNOW exchange widget via iframe.
 * 
 * Props:
 * - from: string (e.g., "btc")
 * - to: string (e.g., "eth")
 * - amount: string or number (e.g., "0.1")
 * - amountFiat: string or number (optional)
 * - backgroundColor: string (hex, e.g., "FFFFFF")
 * - darkMode: boolean
 * - horizontal: boolean
 * - lang: string (e.g., "en-US")
 * - primaryColor: string (hex, e.g., "50C878")
 * - height: string (e.g., "356px")
 * - width: string (e.g., "100%")
 * - [any other ChangeNOW widget params as needed]
 */
const ChangeNowWidget = ({
  from = "btc",
  to = "eth",
  amount = "0.1",
  amountFiat = "",
  backgroundColor = "FFFFFF",
  darkMode = false,
  horizontal = false,
  lang = "en-US",
  primaryColor = "50C878",
  height = "356px",
  width = "100%",
  ...rest
}) => {
  // Get theme context
  const { theme, themeData } = useTheme();

  // Override primaryColor based on theme if not explicitly provided
  const themeBasedPrimaryColor = rest.primaryColor || themeData.colors.accentPrimary.replace('#', '');

  // Override darkMode based on theme if not explicitly provided
  const isDarkTheme = ['NEON_BLUE', 'COSMIC_ORANGE', 'KASPA_GREEN', 'ANDROMEDA_GALAXY', 'MILKY_WAY_NEBULA', 'CRAB_NEBULA'].includes(theme);
  const themeBasedDarkMode = rest.darkMode !== undefined ? darkMode : isDarkTheme;
  // Build the widget URL with query params
  const params = new URLSearchParams({
    FAQ: "false",
    amount: String(amount),
    ...(amountFiat ? { amountFiat: String(amountFiat) } : {}),
    backgroundColor,
    darkMode: String(themeBasedDarkMode),
    from,
    to,
    horizontal: String(horizontal),
    lang,
    primaryColor: themeBasedPrimaryColor,
    hideExtraFees: "true", // This will hide the "No extra fees" text
    ...rest,
  });

  // Add your ChangeNOW link_id here if you have one
  params.set("link_id", "c7ce3416e81112");

  const src = `https://changenow.io/embeds/exchange-widget/v2/widget.html?${params.toString()}`;

  // Load the ChangeNOW stepper-connector script
  React.useEffect(() => {
    const scriptId = "changenow-stepper-connector";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js";
      script.defer = true;
      document.body.appendChild(script);
    }
    // No cleanup needed, script is idempotent
  }, []);

  // Update the widget when theme changes
  React.useEffect(() => {
    // Force iframe reload when theme changes
    const iframe = document.getElementById("iframe-widget");
    if (iframe) {
      iframe.src = src;
    }
  }, [theme, src]);

  return (
    <div style={{ width }}>
      <iframe
        id="iframe-widget"
        src={src}
        style={{ height, width: "100%", border: "none" }}
        title="ChangeNOW Exchange Widget"
        allow="clipboard-write"
      />
    </div>
  );
};

export default ChangeNowWidget;
