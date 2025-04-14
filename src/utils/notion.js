import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.REACT_APP_NOTION_API_KEY,
});

export const fetchNotionData = async (databaseId) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    return [];
  }
};

export const formatNotionData = (notionData) => {
    console.log('asasa');
  return notionData.map(page => {
    const properties = page.properties;
    const formattedData = {};
    
    Object.keys(properties).forEach(key => {
      const property = properties[key];
      if (property.type === 'title') {
        formattedData[key] = property.title[0]?.plain_text || '';
      } else if (property.type === 'rich_text') {
        formattedData[key] = property.rich_text[0]?.plain_text || '';
      } else if (property.type === 'select') {
        formattedData[key] = property.select?.name || '';
      }
    });
    
    return formattedData;
  });
}; 