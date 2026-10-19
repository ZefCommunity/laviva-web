# Images

This folder is for photographs the business owns. The live page does not use files from here yet.

The current pictures are loaded from `images.unsplash.com`. They were checked on 19 October 2026:

- Each URL returned HTTP 200.
- Each picture was opened and compared with the words used in its `alt` text.
- The pictures are examples. They are not photographs of Laviva's own clothes or hair.

Customers need an internet connection to see them. Before the site is published, replace them with pictures Laviva has a licence to use.

## How a product uses a picture

In `js/products.js`, a sample product stores an Unsplash photo id:

```javascript
imageId: "1539109136881-3be0616acf4b"
```

`LavivaCatalog.imageUrls` turns that id into a sized URL. To use a local file instead:

1. Save the file in this folder, for example `assets/images/blue-coat.jpg`.
2. Remove `imageId` from that product.
3. Add `image: "assets/images/blue-coat.jpg"`.
4. Keep `imageAlt` honest. Describe what the picture shows.

The local path must look like `assets/images/your-file.jpg`. The code rejects other paths so a bad value cannot point the page at an unexpected address.

## Pictures used on the page

| Where | Unsplash photo id | What the picture actually shows |
| --- | --- | --- |
| Hero | `1531123897727-8f129e1688ce` | A person in a purple patterned Ankara top and white collar |
| Ready-to-wear card | `1445205170230-053b83016050` | Clothes hanging in a shop window |
| Bespoke card and bespoke section | `1595777457583-95e059d581b8` | A person in a floor-length red gown |
| Thrift card | `1551232864-3f0890e580d9` | A rail of jackets, including denim, plus shoes and a hat |
| Hair card and Colour Wig Selection | `1634315775834-3e1ac73de6b6` | Bob wigs on mannequin heads in a shop window |
| About | `1490481651871-ab68de25d43d` | A rail of hanging clothes, including a white blouse |
| Blue Coat Set | `1539109136881-3be0616acf4b` | A light blue coat and skirt in a city square |
| Floral Wrap Dress | `1496747611176-843222e1e57c` | A white floral wrap dress beside the sea |
| White Tiered Dress | `1515372039744-b8f02a3ae446` | An off-shoulder white tiered dress |
| Light Blue Shirt | `1558171813-4c088753af8f` | A light blue shirt on a folding chair |
| Vintage Jacket Rail | `1603524961821-fcbbee4f0ae0` | Jackets on a second-hand rail |
| Custom Occasion Outfit | `1648328168368-3a25f2152802` | A couple in coordinated green traditional outfits |
| Straight Auburn Wig | `1663582815412-665909d70e01` | Long auburn hair on a display head |
| Defined Curl Hair | `1519699047748-de8e457a634e` | A person with full curly hair |
| Straight Hair Finish | `1634449571010-02389ed0f9b0` | Hair being rinsed at a salon basin |

Unsplash asks people to follow its licence. Attribution is appreciated. These files are still external, so they can change or disappear. Business-owned files in this folder are the safer production choice.
