<script>
(function() {
    function extractCardData(card) {
        const nameEl = card.querySelector('h2.title');
        const name = nameEl ? nameEl.innerText.trim() : "شاليه للإيجار";
        const priceEl = card.querySelector('h2.total-price span');
        const price = priceEl ? priceEl.innerText.trim().replace(/\D/g, '') : "0";
        const durationEl = card.querySelector('h2.sub-title-price');
        const duration = durationEl ? durationEl.innerText.trim() : "PER NIGHT";
        const locationEl = card.querySelector('.location-card p');
        const location = locationEl ? locationEl.innerText.trim() : "المملكة العربية السعودية";
        const imgEl = card.querySelector('img.product-image-src');
        let imageUrl = "";
        if (imgEl) {
            imageUrl = imgEl.src || imgEl.getAttribute('data-src') || "";
            if (imageUrl.startsWith('/')) imageUrl = window.location.origin + imageUrl;
        }
        const url = window.location.href;
        return { name, price, duration, location, imageUrl, url };
    }

    const cards = document.querySelectorAll('.details-card-product');
    if (cards.length === 0) return;

    const itemListElement = Array.from(cards).map((card, index) => {
        const data = extractCardData(card);
        return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "RealEstateListing",
                "name": data.name,
                "url": data.url,
                "image": data.imageUrl,
                "mainEntity": {
                    "@type": "HolidayHome",
                    "accommodationCategory": "Chalet",
                    "name": data.name,
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "SA",
                        "addressRegion": data.location,
                        "addressLocality": data.location
                    },
                    "priceSpecification": {
                        "@type": "UnitPriceSpecification",
                        "price": data.price,
                        "priceCurrency": "SAR",
                        "unitText": data.duration
                    }
                }
            }
        };
    });

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": "شاليهات واستراحات - قولدن هوست",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": itemListElement
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
})();
</script>
