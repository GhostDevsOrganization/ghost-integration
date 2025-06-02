import React from "react";

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
 * - textColor: string (hex, e.g., "FFFFFF") // <-- Added textColor prop
 * - height: string (e.g., "356px")
 * - width: string (e.g., "100%")
 * - [any other ChangeNOW widget params as needed]
 */
const ChangeNowWidget = ({
  from = "eth",
  to = "kas",
  amount = "0.1",
  amountFiat = "",
  backgroundColor = "123456",
  darkMode = false,
  horizontal = false,
  lang = "en-US",
  primaryColor = "50C878",
  textColor = "ffffff",
  height = "356px",
  width = "100%",
  ...rest
}) => {
  // Build the widget URL with query params
  const params = new URLSearchParams({
    FAQ: "false",
    amount: String(amount),
    ...(amountFiat ? { amountFiat: String(amountFiat) } : {}),
    backgroundColor,
    darkMode: String(darkMode),
    from,
    to,
    horizontal: String(horizontal),
    lang,
    primaryColor,
    hideExtraFees: "true", // This will hide the "No extra fees" text
    ...(textColor ? { textColor } : {}), // <-- Add textColor to the params
    ...rest,
  });

  // Add your ChangeNOW link_id here
  params.set("link_id", "c7ce3416e81112");

  const src = `https://changenow.io/embeds/exchange-widget/v2/widget.html?${params.toString()}`;

  // Load the ChangeNOW stepper-connector script
  React.useEffect(() => {
    /*
    const scriptId = "changenow-stepper-connector";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js";
      script.defer = true;
      document.body.appendChild(script);
    }
    */
  }, []);

  return (
    <div style={{ width, marginTop: '96px' }}>
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
