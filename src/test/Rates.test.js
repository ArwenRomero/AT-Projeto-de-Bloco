import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Rates } from './Rates';

const mockUserReview = {
  author: 'Você',
  content: 'Ótimo filme!',
  rating: 8,
};

const mockReviews = [
  { author: 'João', content: 'Adorei!', rating: 10 },
  { author: 'Maria', content: 'Filme médio.', rating: 6 },
  { author: 'Lucas', content: 'Muito ruim!', rating: 2 },
  { author: 'Ana', content: 'Excelente história!', rating: 9 },
  { author: 'Paulo', content: 'Não é meu estilo.', rating: 5 },
  { author: 'Carla', content: 'Gostei!', rating: 7 },
];

describe('Rates Component', () => {
  it('deve renderizar o título "Avaliações"', () => {
    const { getByText } = render(
      <Rates userReview={mockUserReview} reviews={mockReviews} />
    );

    expect(getByText('Avaliações')).toBeTruthy();
  });

  it('deve renderizar avaliações iniciais corretamente', () => {
    const { getByText } = render(
      <Rates userReview={mockUserReview} reviews={mockReviews} />
    );

    expect(getByText('Ótimo filme!')).toBeTruthy(); // Avaliação do usuário
    expect(getByText('Adorei!')).toBeTruthy(); // Primeira avaliação
  });

  it('deve carregar mais avaliações ao clicar em "Ver mais"', () => {
    const { getByText, queryByText } = render(
      <Rates userReview={mockUserReview} reviews={mockReviews} />
    );

    expect(queryByText('Gostei!')).toBeNull(); // Avaliação não visível inicialmente

    fireEvent.press(getByText('Ver mais'));

    expect(getByText('Gostei!')).toBeTruthy(); // Avaliação visível após carregar mais
  });

  it('não deve renderizar o botão "Ver mais" se não houver mais avaliações', () => {
    const shortReviews = mockReviews.slice(0, 2);
    const { queryByText } = render(
      <Rates userReview={mockUserReview} reviews={shortReviews} />
    );

    expect(queryByText('Ver mais')).toBeNull();
  });
});
