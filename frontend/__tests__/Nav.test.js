import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeCartItem, fakeUser } from '../lib/testUtils';
import Nav from '../components/Nav';
import { CartStateProvider } from '../lib/cartState';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const SignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const SignedInMockWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        }),
      },
    },
  },
];

describe('<Nav />', () => {
  it('renders a minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    expect(container).toMatchSnapshot();
    debug();
    expect(container).toHaveTextContent('Sign In');
    const link = screen.getByText('Sign In');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signin');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');
  });
  it('renders full nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={SignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
    expect(container).toHaveTextContent('My Cart');
  });
  it('renders the amount of items in the cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={SignedInMockWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(screen.getByText('9')).toBeInTheDocument();
  });
});
