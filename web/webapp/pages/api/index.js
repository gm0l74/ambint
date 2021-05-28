//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import { search, count_seats } from 'lib/firebase/db';

//---------------------------------
// Constants
//---------------------------------
const COLLECTIONS = [ 'users', 'buildings', 'rooms', 'seats' ];

//---------------------------------
// Handler
//---------------------------------
export default async function handler({ query }, res) {
  // Fetch data from database
  if (!COLLECTIONS.includes(query.type)) {
    return res.status(500).json({
      message: 'Unsupported "type"'
    });
  }

  // Perform the search itself
  let { type, n_seats, occupancy, ...filters } = query;
  let content = await search(type, filters);

  // Handle seats count
  let i = content.length;
  while (i--) {
    if (['building', 'room'].includes(content[i].type)) {
      const key = content[i].type;

      let [ occupied, total ] = await count_seats(key, content[i].uid);

      content[i].n_seats = total;
      content[i].occupancy = (total === 0) ? 0 : occupied / total;

      // Filter by 'n_seats' or 'occupancy'
      if (
        (
          Object.keys(query).includes('n_seats') &&
          content[i].n_seats < query.n_seats
        ) || (
          Object.keys(query).includes('occupancy') &&
          content[i].occupancy < query.occupancy
        )
      ) {
        content.splice(i, 1);
      }
    }
  }

  // Returning search results
  if (!content.length) {
    return res.status(404).json({
      message: 'No search results'
    });
  }

  return res.status(200).json(
    (content.length === 1) ? content[0] : content
  );
}
