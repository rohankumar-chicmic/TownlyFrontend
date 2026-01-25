import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type'

export const DUMMY_PROPERTIES: PropertyCardProps[] = [
  {
    title: 'Arbit Cottage',
    location: 'South Japan',
    imageUrl: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
    isFractional: true,
    category: 'Residential',
    riskData: {
      score: 3.4,
      label: 'Low Moderate Risk',
    },
    pricing: {
      pricePerShare: 100,
      currency: 'ETH',
      availability: 69985,
      totalShares: 70000,
    },
    yieldPercentage: 8.4,
    onViewDetails: () => console.log('Navigating to Arbit Cottage...'),
    onInvest: () => console.log('Investing in Arbit Cottage...'),
  },
  {
    title: 'Duke Palace',
    location: '200m Far From Sentosa Island',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    isFractional: true,
    category: 'Residential',
    riskData: {
      score: 3.4,
      label: 'Low Moderate Risk',
    },
    pricing: {
      pricePerShare: 100,
      currency: 'ETH',
      availability: 69985,
      totalShares: 70000,
    },
    yieldPercentage: 8.4,
    onViewDetails: () => console.log('Navigating to Duke Palace...'),
    onInvest: () => console.log('Investing in Duke Palace...'),
  },
  {
    title: 'Studio Beach',
    location: '200m Far From Sentosa Island',
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    isFractional: true,
    category: 'Residential',
    riskData: {
      score: 3.4,
      label: 'Low Moderate Risk',
    },
    pricing: {
      pricePerShare: 100,
      currency: 'ETH',
      availability: 69985,
      totalShares: 70000,
    },
    yieldPercentage: 8.4,
    onViewDetails: () => console.log('Navigating to Studio Beach...'),
    onInvest: () => console.log('Investing in Studio Beach...'),
  },
  {
    title: 'Ryokan Hotel',
    location: 'Near Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    isFractional: true,
    category: 'Residential',
    riskData: {
      score: 3.4,
      label: 'Low Moderate Risk',
    },
    pricing: {
      pricePerShare: 100,
      currency: 'ETH',
      availability: 69985,
      totalShares: 70000,
    },
    yieldPercentage: 8.4,
    onViewDetails: () => console.log('Navigating to Ryokan Hotel...'),
    onInvest: () => console.log('Investing in Ryokan Hotel...'),
  },
  {
    title: 'Suburban Family Home',
    location: '9943 Marlowe St, Detroit, MI',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    isFractional: true,
    category: 'Residential',
    riskData: {
      score: 3.4,
      label: 'Low Moderate Risk',
    },
    pricing: {
      pricePerShare: 10,
      currency: 'ETH',
      availability: 1000,
      totalShares: 10000,
    },
    yieldPercentage: 9.2,
    onViewDetails: () => console.log('Navigating to Suburban Home...'),
    onInvest: () => console.log('Investing in Suburban Home...'),
  }
];