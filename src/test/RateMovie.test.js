import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RateMovie } from '../RateMovie';

describe('RateMovie Component', () => {
  const mockMovie = {
    title: 'The Matrix',
    release_date: '1999-03-31',
    poster_path: '/image.jpg',
  };

  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  it('should render modal with movie information', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    expect(getByText('Eu assisti...')).toBeTruthy();
    expect(getByText('The Matrix')).toBeTruthy();
    expect(getByText('1999')).toBeTruthy();
    expect(getByPlaceholderText('Escreva sua avaliação aqui...')).toBeTruthy();
  });

  it('should allow selecting rating stars', () => {
    const { getAllByLabelText } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    const stars = getAllByLabelText('star');
    fireEvent.press(stars[2]);

    expect(stars[0].props.name).toBe('star');
    expect(stars[1].props.name).toBe('star');
    expect(stars[2].props.name).toBe('star');
    expect(stars[3].props.name).toBe('star-outline');
  });

  it('should toggle the liked icon (heart)', () => {
    const { getByLabelText } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    const heartIcon = getByLabelText('heart');
    fireEvent.press(heartIcon);

    expect(heartIcon.props.name).toBe('heart');
    fireEvent.press(heartIcon);
    expect(heartIcon.props.name).toBe('heart-outline');
  });

  it('should handle input for review text', () => {
    const { getByPlaceholderText } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    const reviewInput = getByPlaceholderText('Escreva sua avaliação aqui...');
    fireEvent.changeText(reviewInput, 'Excelente filme!');

    expect(reviewInput.props.value).toBe('Excelente filme!');
  });

  it('should call onSave and onClose when saving review', () => {
    const { getByText, getByPlaceholderText } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    const saveButton = getByText('Salvar');
    const reviewInput = getByPlaceholderText('Escreva sua avaliação aqui...');
    fireEvent.changeText(reviewInput, 'Ótimo filme!');
    fireEvent.press(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        author: 'Você',
        content: 'Ótimo filme!',
        rating: expect.any(Number),
        liked: expect.any(Boolean),
        date: expect.any(String),
      })
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose when cancel button is pressed', () => {
    const { getByText } = render(
      <RateMovie
        visible={true}
        onClose={mockOnClose}
        movie={mockMovie}
        onSave={mockOnSave}
      />
    );

    const cancelButton = getByText('Cancelar');
    fireEvent.press(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
