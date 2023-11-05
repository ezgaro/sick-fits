import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/dom';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();
const mocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    result: {
      data: {
        Product: product,
      },
    },
  },
];
describe('SingleProduct', () => {
  it('renders with proper data', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // wait for the testid to show up
    await screen.findByTestId('singleProduct');
    debug();
    expect(container).toMatchSnapshot();
  });

  it('Errours out when an item is not found', async () => {
    const errorMock = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: '123',
          },
        },
        result: {
          errors: [{ message: 'Items Not Found!' }],
        },
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={errorMock}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    await screen.findByTestId('graphql-error');
    expect(container).toHaveTextContent('Items Not Found!');
    expect(container).toHaveTextContent('Shoot!');
  });
});
