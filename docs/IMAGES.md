# Local image guide

All required photographs are already included. You do not need to download anything to run the site. Five images are supplied in two optimized sizes each.

Store replacements in `dist/assets/images/`. Use the exact filenames below and update width/height/srcset descriptors if the actual dimensions change. The `-small.webp` variants use the same filename stem and are up to 720 pixels wide, or up to 850 pixels tall for portrait images. The HTML declares the actual width of each variant.

| Included filename | Actual large dimensions | Used on | Photographer / original download page |
|---|---:|---|---|
| `hero-garden.webp` | 1800 × 1200 | Homepage hero, Willow Cottage, full garden design | [Darren Richardson](https://unsplash.com/photos/a-house-with-a-garden-in-front-of-it-ep4jiG9H2vI) |
| `courtyard-garden.webp` | 1600 × 1065 | Gallery, Old Town Courtyard, consultation | [ᛟᛞᚨᛚᚹ / @odalv](https://unsplash.com/photos/courtyard-garden-with-brick-building-and-trees-GzeogIYUXms) |
| `country-garden.webp` | 1600 × 1067 | Homepage, gallery, Orchard House | [paws_and_prints](https://unsplash.com/photos/stone-cottage-with-manicured-garden-and-pathway-e7KyKCh4iCM) |
| `planting-detail.webp` | 1066 × 1600 | Homepage service section, planting design | [Belov Sergey](https://unsplash.com/photos/tall-purple-flowers-bloom-in-a-sunlit-garden-XUX3Z_Dp64E) |
| `rose-path.webp` | 1205 × 1600 | Studio page, gallery, The Rose Walk | [Antje Winkler](https://unsplash.com/photos/a-winding-path-through-a-lush-garden-with-pink-flowers-IaBPwYmdYKY) |

## Recommended replacement subjects

- `hero-garden.webp`: a landscape photograph of a lush residential cottage garden, ideally 1800 × 1200 or larger; keep useful detail near the centre for mobile cropping.
- `courtyard-garden.webp`: a sheltered courtyard, about 1600 × 1065, with a clear sense of enclosure and planting.
- `country-garden.webp`: a country garden path with structured hedges, about 1600 × 1067.
- `planting-detail.webp`: close planting detail with a portrait composition, about 1066 × 1600.
- `rose-path.webp`: a narrow rose-covered garden path, about 1205 × 1600.

Download originals from the credited Unsplash pages; Pexels is another source for replacements, subject to the specific image's license. Convert the source to WebP, create a smaller variant and preserve the exact names. Keep the source record when replacing a photo. Do not use random image URL endpoints.

These stock photographs are licensed under the [Unsplash License](https://unsplash.com/license). The image researcher checked each source page and the license on 29 September 2026. Attribution is included even though the license does not require it. The license applies to the photos, not as a blanket license for unrelated third-party trademarks or rights.

Original photographs show real places. Fictional project descriptions are illustrative concepts, not claims about who designed those gardens. The website discloses that distinction.

## Loading strategy

All image URLs are relative local paths. Main visual images use eager loading and high priority; supporting images use lazy loading. Width and height reserve aspect-ratio information, `object-fit` controls crops, and the image dialog displays the full image. Both versions of every image were opened with Pillow and checked against the referenced filenames.
