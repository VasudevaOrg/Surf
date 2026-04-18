import { HomeLayoutResponse, LayoutBlock } from '../types/homeLayout';

const toHttps = (url: string): string => {
  if (!url) return '';
  return url.replace(/^http:\/\//i, 'https://');
};
const transformBannerItem = (item: any, index: number) => {
  const hasImage = !!item.image_url && item.image_url.trim() !== '';
  return {
    id: item.banner_id || `banner-${index}`,
    imageUrl: hasImage ? toHttps(item.image_url) : undefined,
    source: hasImage ? undefined : require('../assets/images/mainBanner.png'),
    banner_type: item.banner_type,
    object_id: item.object_id,
    url: item.url,
  };
};

export const transformHomeData = (apiData: any) => {
  const layout = apiData.layout || [];

  const transformedLayout = layout.map((block: any) => {
    const type = block.type;
    const data = block.data || [];

    let transformedData = [];

    switch (type) {
      case 'categories':
        transformedData = data.map((item: any, index: number) => ({
          id: item.category_id || `cat-${index}`,
          title: item.category,
          imageSource: item.image_url
            ? { uri: toHttps(item.image_url) }
            : require('../assets/images/demo1.png'),
        }));
        break;

      case 'products':
        transformedData = data.map((item: any, index: number) => {
          return {
            id: item.product_id || `prod-${index}`,
            imageSource: item.image_url
              ? { uri: toHttps(item.image_url) }
              : item.main_pair?.detailed?.image_path
                ? { uri: toHttps(item.main_pair.detailed.image_path) }
                : require('../assets/images/productCardDemo.png'),
            title: item.product,
            discountedPrice: item.price ? parseFloat(item.price) : 0,
            originalPrice: item.list_price ? parseFloat(item.list_price) : 0,
            rating: parseFloat(item.average_rating) || 0,
            reviewCount: parseInt(item.product_reviews_count) || 0,
            deliveryInfo: item.nt_delivery_info || 'Delivery in 48 hours',
            price: item.price ? parseFloat(item.price) : 0,
            isFavorite: !!item.is_wishlist,
            cart_id: item.cart_id || item.item_id || item.wishlist_id,
            stock: parseInt(item.amount) || 0,
          };
        });
        break;

      case 'brand':
      case 'brands':
        transformedData = data.map((item: any, index: number) => {
          const hasImage = !!item.image_url && item.image_url.trim() !== '';
          return {
            id: item.variant_id || `brand-${index}`,
            image: hasImage
              ? toHttps(item.image_url)
              : require('../assets/images/sponsoredCardImage1.png'),
            title: item.variant,
            subTitle: '',
          };
        });
        break;

      case 'vendor':
      case 'vendors':
        transformedData = data.map((item: any, index: number) => {
          const hasImage = !!item.image_url && item.image_url.trim() !== '';
          return {
            id: item.company_id || `vendor-${index}`,
            title: item.company,
            image: hasImage
              ? toHttps(item.image_url)
              : require('../assets/images/demo1.png'),
            subTitle: item.email || '',
          };
        });
        break;

      case 'banner':
        transformedData = data.map(transformBannerItem);
        break;

      case 'promo_cards':
        transformedData = Object.values(data).map(
          (item: any, index: number) => {
            const mainPair: any =
              item.main_pair?.icon || item.main_pair?.detailed
                ? item.main_pair
                : Object.values(item.main_pair || {})[0] || {};
            const imagePath =
              mainPair?.icon?.image_path || mainPair?.detailed?.image_path;
            return {
              id: item.card_id || `promo-${index}`,
              title: item.card_name,
              description: item.description,
              imageUrl: imagePath ? toHttps(imagePath) : undefined,
              banner_type: item.type,
              object_id: item.object_id,
            };
          },
        );
        break;

      case 'popular_picks':
        transformedData = data.map((item: any, index: number) => ({
          id: item.id || `popular-${index}`,
          title: item.title,
          subTitle: item.sub_title || item.subtitle || '',
          image: item.image_url
            ? toHttps(item.image_url)
            : require('../assets/images/popularPicks.png'),
        }));
        break;

      case 'rocket_deals':
        transformedData = data.map((item: any, index: number) => ({
          id: item.product_id || `rocket-${index}`,
          image: item.image_url
            ? toHttps(item.image_url)
            : require('../assets/images/productCardDemo.png'),
        }));
        break;

      default:
        transformedData = data;
    }

    return {
      ...block,
      data: transformedData,
    };
  });

  return {
    layout: transformedLayout,
    // Keep these for now to avoid breaking existing MainContent until it's refactored
    categories:
      transformedLayout.find((b: any) => b.type === 'categories')?.data || [],
    bestSellerProducts:
      transformedLayout.find((b: any) => b.type === 'products')?.data || [],
    brands:
      transformedLayout
        .filter(
          (b: any) =>
            b.type === 'brands' ||
            b.type === 'brand' ||
            b.type === 'vendors' ||
            b.type === 'vendor',
        )
        .flatMap((b: any) => b.data) || [],
    // Add new sections
    banners:
      apiData.banners && apiData.banners.length > 0
        ? apiData.banners.map(transformBannerItem)
        : apiData.banner
          ? [transformBannerItem(apiData.banner, 0)]
          : [],
    discountBanners:
      apiData.discount_banners && apiData.discount_banners.length > 0
        ? apiData.discount_banners.map(transformBannerItem)
        : [],
    popularPicks:
      transformedLayout.find((b: any) => b.type === 'popular_picks')?.data ||
      [],
    rocketDeals: (() => {
      const rocketBlock = transformedLayout.find(
        (b: any) => b.type === 'rocket_deals',
      );
      if (rocketBlock && rocketBlock.data && rocketBlock.data.length > 0) {
        return {
          mainImage: rocketBlock.data[0]?.image || null,
          timerValue: rocketBlock.timer || '00h: 00m: 00s',
          gridItems: rocketBlock.data || [],
          moreCount: rocketBlock.more_count || 0,
        };
      }
      return null;
    })(),
    // Add main_categories from API response, handling both array and object formats
    main_categories: apiData.main_categories
      ? Array.isArray(apiData.main_categories)
        ? apiData.main_categories
        : Object.values(apiData.main_categories)
      : [],
    min_cart_amount: apiData.min_cart_amount
      ? parseFloat(apiData.min_cart_amount)
      : undefined,
  };
};
