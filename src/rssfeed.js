// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   CircularProgress,
//   Link,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';

// const CurrencyNews = () => {
//   const [feedItems, setFeedItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const CORS_PROXY = 'http://localhost:3000/';
//         const RSS_FEED_URL =
//           'https://www.reutersagency.com/feed/?best-sectors=foreign-exchange-fixed-income&post_type=best';
//         const response = await fetch(CORS_PROXY + RSS_FEED_URL);
//         const data = await response.text();
//         const parser = new DOMParser();
//         const xml = parser.parseFromString(data, 'application/xml');
//         const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
//           title: item.querySelector('title').textContent,
//           link: item.querySelector('link').textContent,
//           description: item.querySelector('description').textContent,
//         }));
//         setFeedItems(items);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Currency News
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <List>
//           {feedItems.map((item, index) => (
//             <ListItem key={index}>
//               <ListItemText
//                 primary={
//                   <Link href={item.link} target="_blank" rel="noopener noreferrer">
//                     {item.title}
//                   </Link>
//                 }
//                 secondary={item.description}
//               />
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </div>
//   );
// };

// export default CurrencyNews;
import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const CurrencyNews = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CORS_PROXY = 'https://whatstheprice.vercel.app/';

  const fetchData = useCallback(async () => {
    try {
      const RSS_FEED_URL =
        'https://www.reutersagency.com/feed/?best-sectors=foreign-exchange-fixed-income&post_type=best';
      const response = await fetch(CORS_PROXY + RSS_FEED_URL);
      const data = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
      }));
      setFeedItems(items);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError('Error fetching data');
    }
  }, [CORS_PROXY]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Currency News
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div>
          <Button onClick={handleRefresh} variant="outlined" sx={{ mb: 2 }}>
            Refresh
          </Button>
          <List>
            {feedItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </Link>
                  }
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default CurrencyNews;
