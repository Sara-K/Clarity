import technologyImg from '../assets/technology.png';
import programmingImg from '../assets/programming.png';
import travelImg from '../assets/travel.png';
import politicsImg from '../assets/politics.png';
import fashionImg from '../assets/fashion.png';
import marketingImg from '../assets/marketing.png';
import stocksInvestingImg from '../assets/stocks-investing.png';
import businessStartupsImg from '../assets/business-startups.png';
import personalFinanceImg from '../assets/finance.png';
import healthFitnessImg from '../assets/health-fitness.png';

export const categoryImages: Record<string, string> = {
    technology: technologyImg,
    programming: programmingImg,
    travel: travelImg,
    politics: politicsImg,
    fashion: fashionImg,
    marketing: marketingImg,
    'stocks-investing': stocksInvestingImg,
    'business-startups': businessStartupsImg,
    'personal-finance': personalFinanceImg,
    'health-fitness': healthFitnessImg,
};

export const getCategoryImage = (slug: string): string | undefined => {
    return categoryImages[slug];
};
