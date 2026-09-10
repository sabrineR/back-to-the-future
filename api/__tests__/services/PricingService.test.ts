import { Movie } from '../../src/domain/entities/movie';
import { PricingService } from '../../src/shared/services/PricingService';
const createMovie = (
    title: string,
    price: number,
    franchise: string | null = null
): Movie => {
    const movieOrError = Movie.create({
        title,
        price,
        franchise,
        imageUrl: null,
    });

    return movieOrError.getValue();
};

describe('PricingService', () => {
    const bttf1 = createMovie('Back to the Future 1', 15, 'Back to the Future');

    const bttf2 = createMovie('Back to the Future 2', 15, 'Back to the Future');

    const bttf3 = createMovie('Back to the Future 3', 15, 'Back to the Future');

    const laChevre = createMovie('La chèvre', 20);

    it('should return 36€ for BTTF1 + BTTF2 + BTTF3', () => {
        const total = PricingService.calculate([bttf1, bttf2, bttf3]);

        expect(total).toBe(36);
    });

    it('should return 27€ for BTTF1 + BTTF3', () => {
        const total = PricingService.calculate([bttf1, bttf3]);

        expect(total).toBe(27);
    });

    it('should return 15€ for BTTF1', () => {
        const total = PricingService.calculate([bttf1]);

        expect(total).toBe(15);
    });

    it('should return 48€ for BTTF1 + BTTF2 + BTTF3 + BTTF2', () => {
        const total = PricingService.calculate([bttf1, bttf2, bttf3, bttf2]);

        expect(total).toBe(48);
    });

    it('should return 56€ for BTTF1 + BTTF2 + BTTF3 + La chèvre', () => {
        const total = PricingService.calculate([bttf1, bttf2, bttf3, laChevre]);

        expect(total).toBe(56);
    });
});
