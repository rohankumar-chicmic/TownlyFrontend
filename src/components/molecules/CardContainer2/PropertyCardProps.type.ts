
interface PropertyCardProps {
    title: string;
    location: string;
    imageUrl: string;
    isFractional: boolean;
    category: 'Residential' | 'Commercial' | 'Industrial';
    riskData: {
      score: number;
      label: string;
    };
    pricing: {
      pricePerShare: number;
      currency: string;
      availability: number;
    };
    yieldPercentage: number;
    onViewDetails: () => void;
    onInvest: () => void;
  }

  export default PropertyCardProps;