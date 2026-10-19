/*
 * WhatsApp enquiry helper.
 *
 * This builds a wa.me link and checks the configured number.
 * Opening WhatsApp only shows a draft. It does not prove the message was sent.
 */
(function () {
  var GENERAL_MESSAGE = [
    "Hello Laviva,",
    "",
    "I would like to ask about your fashion and hair collections.",
    "Please let me know what is available."
  ].join("\n");

  function readConfig() {
    if (!window.LavivaConfig) {
      return {
        number: "",
        placeholder: "0000000000000",
        businessName: "Laviva"
      };
    }
    return {
      number: typeof LavivaConfig.whatsappNumber === "string" ? LavivaConfig.whatsappNumber.trim() : "",
      placeholder:
        typeof LavivaConfig.whatsappNumberPlaceholder === "string"
          ? LavivaConfig.whatsappNumberPlaceholder.trim()
          : "0000000000000",
      businessName: LavivaConfig.businessName || "Laviva"
    };
  }

  function isConfiguredNumber(number, placeholder) {
    if (typeof number !== "string") {
      return false;
    }
    var cleaned = number.trim();
    if (cleaned === "" || cleaned === placeholder) {
      return false;
    }
    return /^[1-9]\d{7,14}$/.test(cleaned);
  }

  function isConfigured() {
    var config = readConfig();
    return isConfiguredNumber(config.number, config.placeholder);
  }

  function cleanLine(value, maxLength) {
    return String(value == null ? "" : value)
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function buildProductMessage(product) {
    if (!product || !window.LavivaCatalog) {
      return "";
    }
    var lines = [
      "Hello Laviva, I would like to enquire about an item.",
      "",
      "Product: " + cleanLine(product.name, 80),
      "Product ID: " + cleanLine(product.id, 40),
      "Category: " + cleanLine(LavivaCatalog.categoryLabel(product.category), 40),
      "Listed price: " + LavivaCatalog.formatPrice(product.price),
      "",
      "Please confirm availability, the final price, and how delivery or collection would work."
    ];
    return lines.join("\n");
  }

  function buildContactMessage(details) {
    var safe = details || {};
    var lines = [
      "Hello Laviva, I would like to make an enquiry.",
      "",
      "Name: " + cleanLine(safe.name, 60),
      "Email: " + cleanLine(safe.email, 100),
      "Category: " + cleanLine(safe.categoryLabel, 40),
      "",
      "Message:",
      String(safe.message || "").replace(/\r\n/g, "\n").trim().slice(0, 600)
    ];
    return lines.join("\n");
  }

  function limitMessage(message) {
    var text = String(message || "").trim();
    if (text.length > 900) {
      return text.slice(0, 897) + "...";
    }
    return text;
  }

  function createLink(message) {
    var config = readConfig();
    var text = limitMessage(message);
    if (!text) {
      return { ok: false, reason: "empty-message", url: "" };
    }
    if (!isConfiguredNumber(config.number, config.placeholder)) {
      return { ok: false, reason: "not-configured", url: "" };
    }
    var url = "https://wa.me/" + config.number + "?text=" + encodeURIComponent(text);
    if (!/^https:\/\/wa\.me\/[1-9]\d{7,14}\?text=/.test(url)) {
      return { ok: false, reason: "invalid-link", url: "" };
    }
    return { ok: true, reason: "", url: url };
  }

  function openLink(url) {
    if (!/^https:\/\/wa\.me\/[1-9]\d{7,14}\?text=/.test(url)) {
      return false;
    }
    var opened = window.open(url, "_blank", "noopener,noreferrer");
    return Boolean(opened);
  }

  window.LavivaWhatsApp = {
    generalMessage: GENERAL_MESSAGE,
    isConfiguredNumber: isConfiguredNumber,
    isConfigured: isConfigured,
    buildProductMessage: buildProductMessage,
    buildContactMessage: buildContactMessage,
    createLink: createLink,
    openLink: openLink
  };
})();
