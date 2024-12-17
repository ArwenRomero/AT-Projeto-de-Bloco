import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('deve renderizar o campo de busca com placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar term="" onTermChange={() => {}} onTermSubmit={() => {}} isLoading={false} />
    );

    expect(getByPlaceholderText('Pesquisar filmes...')).toBeTruthy();
  });

  it('deve chamar a função "onTermChange" ao digitar no campo', () => {
    const mockOnTermChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        term=""
        onTermChange={mockOnTermChange}
        onTermSubmit={() => {}}
        isLoading={false}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Pesquisar filmes...'), 'Vingadores');
    expect(mockOnTermChange).toHaveBeenCalledWith('Vingadores');
  });

  it('deve chamar a função "onTermSubmit" ao pressionar o botão de busca', () => {
    const mockOnTermSubmit = jest.fn();
    const { getByRole } = render(
      <SearchBar
        term=""
        onTermChange={() => {}}
        onTermSubmit={mockOnTermSubmit}
        isLoading={false}
      />
    );

    fireEvent.press(getByRole('button'));
    expect(mockOnTermSubmit).toHaveBeenCalled();
  });

  it('deve exibir o indicador de carregamento quando "isLoading" for true', () => {
    const { getByTestId } = render(
      <SearchBar
        term=""
        onTermChange={() => {}}
        onTermSubmit={() => {}}
        isLoading={true}
      />
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('não deve exibir o indicador de carregamento quando "isLoading" for false', () => {
    const { queryByTestId } = render(
      <SearchBar
        term=""
        onTermChange={() => {}}
        onTermSubmit={() => {}}
        isLoading={false}
      />
    );

    expect(queryByTestId('activity-indicator')).toBeNull();
  });
});
