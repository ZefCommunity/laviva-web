/*
 * Sample catalogue and the pure functions that work on it.
 *
 * DEMONSTRATION DATA: names, descriptions, and prices are examples for class.
 * Laviva must check every item, price, and photograph before this site is published.
 * Prices use Nigerian naira. A missing price means the customer should request a quote.
 */
(function () {
  var CATEGORY_LABELS = {
    fashion: "Fashion",
    wigs: "Wigs",
    "human-hair": "Human Hair"
  };

  var COLLECTION_LABELS = {
    "ready-to-wear": "Ready-to-wear",
    thrift: "Thrift finds",
    bespoke: "Bespoke outfits",
    wigs: "Wigs",
    "human-hair": "Human hair"
  };

  function unsplashImage(photoId, width) {
    var allowedWidth = width === 480 || width === 800 || width === 1200 ? width : 800;
    if (!/^[0-9]+-[A-Za-z0-9-]+$/.test(photoId)) {
      return "";
    }
    return (
      "https://images.unsplash.com/photo-" +
      photoId +
      "?auto=format&fit=crop&w=" +
      allowedWidth +
      "&q=75"
    );
  }

  function isLocalImage(path) {
    return typeof path === "string" && /^assets\/images\/[A-Za-z0-9._-]+$/.test(path);
  }

  function isValidProduct(product) {
    if (!product || typeof product !== "object") {
      return false;
    }
    if (typeof product.id !== "string" || product.id.trim() === "") {
      return false;
    }
    if (typeof product.name !== "string" || product.name.trim() === "") {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, product.category)) {
      return false;
    }
    if (!Object.prototype.hasOwnProperty.call(COLLECTION_LABELS, product.collection)) {
      return false;
    }
    if (typeof product.description !== "string" || product.description.trim() === "") {
      return false;
    }
    if (typeof product.imageAlt !== "string" || product.imageAlt.trim() === "") {
      return false;
    }
    var priceIsEmpty = product.price === null;
    var priceIsNumber = typeof product.price === "number" && Number.isFinite(product.price) && product.price >= 0;
    if (!priceIsEmpty && !priceIsNumber) {
      return false;
    }
    return typeof product.imageId === "string" || isLocalImage(product.image);
  }

  function imageUrls(product) {
    if (isLocalImage(product.image)) {
      return { src: product.image, srcset: "" };
    }
    if (typeof product.imageId !== "string") {
      return { src: "", srcset: "" };
    }
    return {
      src: unsplashImage(product.imageId, 800),
      srcset: [480, 800, 1200]
        .map(function (width) {
          return unsplashImage(product.imageId, width) + " " + width + "w";
        })
        .join(", ")
    };
  }

  function formatPrice(price) {
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      return "Request a Quote";
    }
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(price);
  }

  function categoryLabel(category) {
    return CATEGORY_LABELS[category] || "Product";
  }

  function collectionLabel(collection) {
    return COLLECTION_LABELS[collection] || "Collection";
  }

  function filterProducts(products, filter) {
    var list = Array.isArray(products) ? products : [];
    var safeFilter = filter && typeof filter.type === "string" ? filter : { type: "all" };

    return list.filter(function (product) {
      if (!isValidProduct(product)) {
        return false;
      }
      if (safeFilter.type === "all") {
        return true;
      }
      if (safeFilter.type === "category") {
        return product.category === safeFilter.value;
      }
      if (safeFilter.type === "collection") {
        return product.collection === safeFilter.value;
      }
      if (safeFilter.type === "group" && safeFilter.value === "hair") {
        return product.category === "wigs" || product.category === "human-hair";
      }
      return false;
    });
  }

  function getById(products, id) {
    var list = Array.isArray(products) ? products : [];
    var match = null;
    list.forEach(function (product) {
      if (!match && isValidProduct(product) && product.id === id) {
        match = product;
      }
    });
    return match;
  }

  function describeResults(filter, count) {
    var noun = count === 1 ? "product" : "products";
    var safeFilter = filter && typeof filter.type === "string" ? filter : { type: "all" };

    if (safeFilter.type === "all") {
      return count === 0 ? "No products to show." : "Showing " + count + " " + noun + ".";
    }

    var viewName = "this view";
    if (safeFilter.type === "category") {
      viewName = categoryLabel(safeFilter.value);
    } else if (safeFilter.type === "collection") {
      viewName = collectionLabel(safeFilter.value);
    } else if (safeFilter.type === "group" && safeFilter.value === "hair") {
      viewName = "hair collections";
    }

    if (count === 0) {
      return "No products in " + viewName + ". Choose All to see the full catalogue.";
    }
    return "Showing " + count + " " + noun + " in " + viewName + ".";
  }

  window.LavivaProducts = [
    {
      id: "lv-rtw-001",
      name: "Blue Coat Set",
      category: "fashion",
      collection: "ready-to-wear",
      price: 58000,
      description: "A light blue coat worn with a matching skirt, a pale scarf, and white boots. This is a sample ready-to-wear price.",
      imageId: "1539109136881-3be0616acf4b",
      imageAlt: "A person wearing a light blue coat and matching skirt, a pale scarf, white boots, and sunglasses in a city square."
    },
    {
      id: "lv-rtw-002",
      name: "Floral Wrap Dress",
      category: "fashion",
      collection: "ready-to-wear",
      price: 46000,
      description: "A white wrap dress with a red floral print and a side slit. This is a sample ready-to-wear price.",
      imageId: "1496747611176-843222e1e57c",
      imageAlt: "A person wearing a white floral wrap dress with a side slit and holding a woven bag beside the sea."
    },
    {
      id: "lv-rtw-003",
      name: "White Tiered Dress",
      category: "fashion",
      collection: "ready-to-wear",
      price: 39000,
      description: "An off-shoulder white dress with soft tiers. This is a sample ready-to-wear price.",
      imageId: "1515372039744-b8f02a3ae446",
      imageAlt: "A person in an off-shoulder white tiered dress and white trainers, standing on outdoor steps."
    },
    {
      id: "lv-thf-001",
      name: "Light Blue Shirt",
      category: "fashion",
      collection: "thrift",
      price: 12500,
      description: "A light blue button-up shirt from the sample thrift edit. Ask about size and condition before paying.",
      imageId: "1558171813-4c088753af8f",
      imageAlt: "A light blue button-up shirt draped over a small folding chair."
    },
    {
      id: "lv-thf-002",
      name: "Vintage Jacket Rail",
      category: "fashion",
      collection: "thrift",
      price: 18500,
      description: "A sample price for one jacket from a second-hand rail. Ask Laviva which sizes are available.",
      imageId: "1603524961821-fcbbee4f0ae0",
      imageAlt: "Several suit jackets hanging on a rail, with handwritten price tags, in a black and white photograph."
    },
    {
      id: "lv-bsp-001",
      name: "Custom Occasion Outfit",
      category: "fashion",
      collection: "bespoke",
      price: null,
      description: "Inspiration for bespoke occasion wear. Tell Laviva about the event, fabric, and timing, then request a quote.",
      imageId: "1648328168368-3a25f2152802",
      imageAlt: "A couple outdoors wearing coordinated green traditional outfits: an embroidered tunic with a cap, and a beaded gown."
    },
    {
      id: "lv-wig-001",
      name: "Colour Wig Selection",
      category: "wigs",
      collection: "wigs",
      price: null,
      description: "Bob wigs in several colours on a shop display. Ask which colour and length are available. The price is confirmed by Laviva.",
      imageId: "1634315775834-3e1ac73de6b6",
      imageAlt: "Mannequin heads in a shop window wearing bob wigs in blue, yellow, purple, red, brown, and black."
    },
    {
      id: "lv-wig-002",
      name: "Straight Auburn Wig",
      category: "wigs",
      collection: "wigs",
      price: 76000,
      description: "Long, straight auburn hair shown on a display head. This sample price must be confirmed for length and specification.",
      imageId: "1663582815412-665909d70e01",
      imageAlt: "Back view of long, straight auburn hair on a brown display head."
    },
    {
      id: "lv-hh-001",
      name: "Defined Curl Hair",
      category: "human-hair",
      collection: "human-hair",
      price: 64000,
      description: "A sample listing for a curly human-hair option. The photograph shows the curl texture, not a sealed package.",
      imageId: "1519699047748-de8e457a634e",
      imageAlt: "A person with full, defined curly hair looking to the side against a pale pink background."
    },
    {
      id: "lv-hh-002",
      name: "Straight Hair Finish",
      category: "human-hair",
      collection: "human-hair",
      price: null,
      description: "A sample enquiry for straight human hair. Ask Laviva about length and availability, then request a quote.",
      imageId: "1634449571010-02389ed0f9b0",
      imageAlt: "A stylist rinsing long, straight hair while a client rests at a white salon basin."
    }
  ];

  window.LavivaCatalog = {
    isValidProduct: isValidProduct,
    imageUrls: imageUrls,
    formatPrice: formatPrice,
    categoryLabel: categoryLabel,
    collectionLabel: collectionLabel,
    filterProducts: filterProducts,
    getById: getById,
    describeResults: describeResults
  };
})();
