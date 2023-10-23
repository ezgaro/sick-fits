/* eslint-disable react/prop-types */

import { useMutation } from '@apollo/client';
import { cacheSlot } from '@apollo/client/cache';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}
export default function DeleteProduct({ id, children }) {
  // {children} make the button more flexible
  // You can add more stuff in it like
  // <DeleteProduct id={product.id}><p>Some staff...</p></DeleteProduct>

  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          // Go ahead and delete it
          deleteProduct().catch((err) => err.message);
        }
      }}
    >
      {children}
    </button>
  );
}
