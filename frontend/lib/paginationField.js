import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tellsapollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        console.log(
          `There are ${items.length} items in te cash.Gonna send them to apollo`
        );
        return items;
      }
      return false;
      // Apollo asks the read() function for those irems.
      //-----------------------

      // We can either do one of two things
      //-------------------------------

      // First thing we can do is return the items
      // because they are already in the cash.
      //------------------------------

      // The other thing we can do is to return FALSE
      // from here, so network request will follow instead.
      // ---------------------------------export default function paginationField() {paginationField.js
    },
    merge(existing, incoming, { args }) {
      console.log(`Merging items from the network ${incoming.length}`);
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      merged.push(incoming);
      for (let i = skip; i < skip + incoming.length; i += 1) {
        merged[i] = incoming[i - skip];
      }
      return merged;
      // This runs when the Apollo client
      // comes back from the network with
      // our products.
    },
  };
}
